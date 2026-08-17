from app.database import SessionLocal
from app.models.user import User
from app.models.shipment import Shipment
from app.models.shipment_history import ShipmentStatusHistory
from app.config import settings
from app.services.auth_service import hash_password
from datetime import date

STATUS_LABELS = {
    'received_in_china': 'Принят на склад в Китае',
    'sent_from_china': 'Выехал со склада',
    'in_transit': 'В пути',
    'customs': 'На таможне',
    'arrived_bishkek': 'Прибыл в Бишкек',
    'ready_for_pickup': 'Готов к выдаче',
    'delivered': 'Выдан клиенту'
}

def seed_db():
    db = SessionLocal()
    try:
        # Check admin
        admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin:
            admin = User(
                first_name=settings.ADMIN_FIRST_NAME,
                last_name=settings.ADMIN_LAST_NAME,
                email=settings.ADMIN_EMAIL,
                password_hash=hash_password(settings.ADMIN_PASSWORD),
                role='admin'
            )
            db.add(admin)
        
        # Check manager
        manager = db.query(User).filter(User.email == 'manager@cargo-kg.com').first()
        if not manager:
            manager = User(
                first_name='Demo',
                last_name='Manager',
                email='manager@cargo-kg.com',
                password_hash=hash_password('Manager1234!'),
                role='manager'
            )
            db.add(manager)

        # Check client
        client = db.query(User).filter(User.email == 'client@cargo-kg.com').first()
        if not client:
            client = User(
                first_name='Demo',
                last_name='Client',
                email='client@cargo-kg.com',
                password_hash=hash_password('Client1234!'),
                role='client',
                client_code='KG1001'
            )
            db.add(client)
            db.commit()
            db.refresh(client)

            # Create shipments for demo client
            s1 = Shipment(
                track_code='CN202600001',
                client_id=client.id,
                date_received=date(2026, 8, 1),
                date_sent=date(2026, 8, 2),
                current_status='delivered',
                current_location='Бишкек',
                weight=5.5
            )
            s2 = Shipment(
                track_code='CN202600002',
                client_id=client.id,
                date_received=date(2026, 8, 10),
                date_sent=date(2026, 8, 12),
                current_status='in_transit',
                current_location='Казахстан',
                weight=2.0
            )
            s3 = Shipment(
                track_code='CN202600003',
                client_id=client.id,
                date_received=date(2026, 8, 15),
                current_status='received_in_china',
                current_location='Гуанчжоу',
                weight=10.0
            )
            db.add_all([s1, s2, s3])
            db.commit()

            # Add histories
            h1_1 = ShipmentStatusHistory(shipment_id=s1.id, status='received_in_china', location='Гуанчжоу', comment=STATUS_LABELS['received_in_china'])
            h1_2 = ShipmentStatusHistory(shipment_id=s1.id, status='sent_from_china', location='Гуанчжоу', comment=STATUS_LABELS['sent_from_china'])
            h1_3 = ShipmentStatusHistory(shipment_id=s1.id, status='delivered', location='Бишкек', comment=STATUS_LABELS['delivered'])
            
            h2_1 = ShipmentStatusHistory(shipment_id=s2.id, status='received_in_china', location='Гуанчжоу', comment=STATUS_LABELS['received_in_china'])
            h2_2 = ShipmentStatusHistory(shipment_id=s2.id, status='in_transit', location='Казахстан', comment=STATUS_LABELS['in_transit'])
            
            h3_1 = ShipmentStatusHistory(shipment_id=s3.id, status='received_in_china', location='Гуанчжоу', comment=STATUS_LABELS['received_in_china'])

            db.add_all([h1_1, h1_2, h1_3, h2_1, h2_2, h3_1])
            db.commit()
        else:
            db.commit()

    finally:
        db.close()
