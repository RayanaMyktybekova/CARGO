from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict
from app.schemas.auth import UserOut
from app.schemas.shipment import ShipmentOut

class ClientCreate(BaseModel):
    first_name: str = Field(..., max_length=100)
    last_name: str = Field(..., max_length=100)
    phone: Optional[str] = Field(None, max_length=30)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str = "client"

class ClientUpdate(BaseModel):
    first_name: Optional[str] = Field(None, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=30)
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class AdminStats(BaseModel):
    total_clients: int
    total_shipments: int
    by_status: Dict[str, int]
