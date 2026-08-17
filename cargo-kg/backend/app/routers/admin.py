from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.admin import ClientCreate, ClientUpdate, AdminStats
from app.schemas.auth import UserOut
from app.schemas.shipment import ShipmentCreate, ShipmentUpdate, ShipmentOut, StatusUpdateRequest
from app.dependencies import require_manager, require_admin, auto_generate_client_code
from app.models.user import User
from app.models.shipment import Shipment, STATUS_CHOICES
from app.services.auth_service import hash_password
from app.services.shipment_service import update_shipment_status, create_shipment

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/clients", response_model=dict)
def list_clients(
    search: str = None, 
    page: int = Query(1, ge=1), 
    limit: int = Query(20, ge=1, le=100), 
    db: Session = Depends(get_db), 
    user: User = Depends(require_manager)
):
    query = db.query(User).filter(User.role == 'client')
    if search:
        query = query.filter(
            (User.first_name.ilike(f"%{search}%")) |
            (User.last_name.ilike(f"%{search}%")) |
            (User.client_code.ilike(f"%{search}%")) |
            (User.phone.ilike(f"%{search}%")) |
            (User.email.ilike(f"%{search}%"))
        )
    
    total = query.count()
    clients = query.offset((page - 1) * limit).limit(limit).all()
    
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": clients
    }

@router.post("/clients", response_model=UserOut)
def create_client(data: ClientCreate, db: Session = Depends(get_db), user: User = Depends(require_manager)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    client = User(
        first_name=data.first_name,
        last_name=data.last_name,
        phone=data.phone,
        email=data.email,
        password_hash=hash_password(data.password),
        role=data.role,
        client_code=auto_generate_client_code(db)
    )
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

@router.get("/clients/{id}", response_model=dict)
def get_client(id: int, db: Session = Depends(get_db), user: User = Depends(require_manager)):
    client = db.query(User).filter(User.id == id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    return {
        "client": client,
        "shipments": client.shipments
    }

@router.patch("/clients/{id}", response_model=UserOut)
def update_client(id: int, data: ClientUpdate, db: Session = Depends(get_db), user: User = Depends(require_manager)):
    client = db.query(User).filter(User.id == id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    if data.first_name:
        client.first_name = data.first_name
    if data.last_name:
        client.last_name = data.last_name
    if data.phone:
        client.phone = data.phone
    if data.email:
        existing = db.query(User).filter(User.email == data.email, User.id != id).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already taken")
        client.email = data.email
    if data.role and user.role == 'admin':
        client.role = data.role
        
    db.commit()
    db.refresh(client)
    return client

@router.delete("/clients/{id}")
def delete_client(id: int, db: Session = Depends(get_db), user: User = Depends(require_admin)):
    client = db.query(User).filter(User.id == id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    db.delete(client)
    db.commit()
    return {"message": "Client deleted"}

@router.get("/shipments", response_model=dict)
def list_shipments(
    status: str = None,
    search: str = None, 
    page: int = Query(1, ge=1), 
    limit: int = Query(20, ge=1, le=100), 
    db: Session = Depends(get_db), 
    user: User = Depends(require_manager)
):
    query = db.query(Shipment)
    if status:
        query = query.filter(Shipment.current_status == status)
    if search:
        query = query.filter(Shipment.track_code.ilike(f"%{search}%"))
        
    total = query.count()
    shipments = query.offset((page - 1) * limit).limit(limit).all()
    
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": shipments
    }

@router.post("/shipments", response_model=ShipmentOut)
def api_create_shipment(data: ShipmentCreate, db: Session = Depends(get_db), user: User = Depends(require_manager)):
    existing = db.query(Shipment).filter(Shipment.track_code == data.track_code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Track code already exists")
    
    return create_shipment(db, data)

@router.get("/shipments/{id}", response_model=dict)
def get_shipment(id: int, db: Session = Depends(get_db), user: User = Depends(require_manager)):
    shipment = db.query(Shipment).filter(Shipment.id == id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    return {
        "shipment": shipment,
        "history": shipment.history
    }

@router.patch("/shipments/{id}", response_model=ShipmentOut)
def patch_shipment(id: int, data: ShipmentUpdate, db: Session = Depends(get_db), user: User = Depends(require_manager)):
    shipment = db.query(Shipment).filter(Shipment.id == id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    if data.track_code:
        existing = db.query(Shipment).filter(Shipment.track_code == data.track_code, Shipment.id != id).first()
        if existing:
            raise HTTPException(status_code=400, detail="Track code already exists")
        shipment.track_code = data.track_code
        
    if data.client_id is not None:
        shipment.client_id = data.client_id
    if data.date_received is not None:
        shipment.date_received = data.date_received
    if data.date_sent is not None:
        shipment.date_sent = data.date_sent
    if data.current_status:
        shipment.current_status = data.current_status
    if data.current_location is not None:
        shipment.current_location = data.current_location
    if data.weight is not None:
        shipment.weight = data.weight
    if data.description is not None:
        shipment.description = data.description
        
    db.commit()
    db.refresh(shipment)
    return shipment

@router.delete("/shipments/{id}")
def delete_shipment(id: int, db: Session = Depends(get_db), user: User = Depends(require_admin)):
    shipment = db.query(Shipment).filter(Shipment.id == id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    db.delete(shipment)
    db.commit()
    return {"message": "Shipment deleted"}

@router.post("/shipments/{id}/status", response_model=ShipmentOut)
def api_update_status(id: int, data: StatusUpdateRequest, db: Session = Depends(get_db), user: User = Depends(require_manager)):
    if data.status not in STATUS_CHOICES:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    try:
        return update_shipment_status(db, id, data.status, data.location, data.comment)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/stats", response_model=AdminStats)
def get_stats(db: Session = Depends(get_db), user: User = Depends(require_manager)):
    total_clients = db.query(User).filter(User.role == 'client').count()
    total_shipments = db.query(Shipment).count()
    
    by_status = {}
    for status in STATUS_CHOICES:
        count = db.query(Shipment).filter(Shipment.current_status == status).count()
        by_status[status] = count
        
    return {
        "total_clients": total_clients,
        "total_shipments": total_shipments,
        "by_status": by_status
    }
