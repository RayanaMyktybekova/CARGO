from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.shipment import TrackingResult, ShipmentHistoryOut
from app.services.shipment_service import get_shipment_by_track_code, get_shipments_by_client_code
from app.models.shipment import Shipment

router = APIRouter(prefix="/api/shipments", tags=["tracking"])

@router.get("/track/{track_code}", response_model=TrackingResult)
def track_shipment(track_code: str, db: Session = Depends(get_db)):
    shipment = get_shipment_by_track_code(db, track_code)
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return {"shipment": shipment, "history": shipment.history}

@router.get("/client/{client_code}", response_model=list[TrackingResult])
def get_client_shipments(client_code: str, db: Session = Depends(get_db)):
    shipments = get_shipments_by_client_code(db, client_code)
    return [{"shipment": s, "history": s.history} for s in shipments]

@router.get("/{shipment_id}", response_model=TrackingResult)
def get_shipment_by_id(shipment_id: int, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return {"shipment": shipment, "history": shipment.history}

@router.get("/{shipment_id}/history", response_model=list[ShipmentHistoryOut])
def get_shipment_history(shipment_id: int, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment.history
