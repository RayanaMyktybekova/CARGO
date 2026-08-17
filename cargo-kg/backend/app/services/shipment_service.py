from sqlalchemy.orm import Session
from app.models.shipment import Shipment
from app.models.shipment_history import ShipmentStatusHistory
from app.models.user import User

def get_shipment_by_track_code(db: Session, track_code: str) -> Shipment | None:
    return db.query(Shipment).filter(Shipment.track_code == track_code).first()

def get_shipments_by_client_code(db: Session, client_code: str) -> list[Shipment]:
    client = db.query(User).filter(User.client_code == client_code).first()
    if not client:
        return []
    return db.query(Shipment).filter(Shipment.client_id == client.id).all()

def update_shipment_status(db: Session, shipment_id: int, status: str, location: str | None, comment: str | None) -> Shipment:
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise ValueError("Shipment not found")
    
    shipment.current_status = status
    if location:
        shipment.current_location = location
        
    history = ShipmentStatusHistory(
        shipment_id=shipment.id,
        status=status,
        location=location,
        comment=comment
    )
    db.add(history)
    db.commit()
    db.refresh(shipment)
    return shipment

def create_shipment(db: Session, data) -> Shipment:
    shipment = Shipment(
        track_code=data.track_code,
        client_id=data.client_id,
        date_received=data.date_received,
        date_sent=data.date_sent,
        current_status=data.current_status,
        current_location=data.current_location,
        weight=data.weight,
        description=data.description
    )
    db.add(shipment)
    db.commit()
    db.refresh(shipment)
    
    history = ShipmentStatusHistory(
        shipment_id=shipment.id,
        status=shipment.current_status,
        location=shipment.current_location,
        comment="Initial status"
    )
    db.add(history)
    db.commit()
    return shipment
