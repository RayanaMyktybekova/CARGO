from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class ShipmentStatusHistory(Base):
    __tablename__ = 'shipment_status_history'
    id = Column(Integer, primary_key=True)
    shipment_id = Column(Integer, ForeignKey('shipments.id'), nullable=False)
    status = Column(String(50), nullable=False)
    location = Column(String(255), nullable=True)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    shipment = relationship('Shipment', back_populates='history')
