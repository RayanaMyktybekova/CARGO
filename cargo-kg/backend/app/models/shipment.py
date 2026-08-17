from sqlalchemy import Column, Integer, String, Float, Text, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

STATUS_CHOICES = [
    'received_in_china',
    'sent_from_china',
    'in_transit',
    'customs',
    'arrived_bishkek',
    'ready_for_pickup',
    'delivered'
]

class Shipment(Base):
    __tablename__ = 'shipments'
    id = Column(Integer, primary_key=True)
    track_code = Column(String(50), unique=True, nullable=False, index=True)
    client_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    date_received = Column(Date, nullable=True)
    date_sent = Column(Date, nullable=True)
    current_status = Column(String(50), default='received_in_china')
    current_location = Column(String(255), nullable=True)
    weight = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # relationships
    client = relationship('User', back_populates='shipments')
    history = relationship('ShipmentStatusHistory', back_populates='shipment', order_by='ShipmentStatusHistory.created_at')
