from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime
from app.schemas.auth import UserOut

class ShipmentHistoryOut(BaseModel):
    id: int
    status: str
    location: Optional[str] = None
    comment: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}

class ShipmentOut(BaseModel):
    id: int
    track_code: str
    client_id: Optional[int] = None
    date_received: Optional[date] = None
    date_sent: Optional[date] = None
    current_status: str
    current_location: Optional[str] = None
    weight: Optional[float] = None
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    client: Optional[UserOut] = None

    model_config = {"from_attributes": True}

class ShipmentCreate(BaseModel):
    track_code: str = Field(..., max_length=50)
    client_id: Optional[int] = None
    date_received: Optional[date] = None
    date_sent: Optional[date] = None
    current_status: str = "received_in_china"
    current_location: Optional[str] = None
    weight: Optional[float] = None
    description: Optional[str] = None

class ShipmentUpdate(BaseModel):
    track_code: Optional[str] = Field(None, max_length=50)
    client_id: Optional[int] = None
    date_received: Optional[date] = None
    date_sent: Optional[date] = None
    current_status: Optional[str] = None
    current_location: Optional[str] = None
    weight: Optional[float] = None
    description: Optional[str] = None

class StatusUpdateRequest(BaseModel):
    status: str
    location: Optional[str] = None
    comment: Optional[str] = None

class TrackingResult(BaseModel):
    shipment: ShipmentOut
    history: List[ShipmentHistoryOut]
