import bcrypt
from datetime import datetime, timedelta
from jose import jwt
from app.config import settings
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.dependencies import auto_generate_client_code

def hash_password(plain: str) -> str:
    pwd_bytes = plain.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain: str, hashed: str) -> bool:
    try:
        pwd_bytes = plain.encode('utf-8')[:72]
        hashed_bytes = hashed.encode('utf-8')
        return bcrypt.checkpw(pwd_bytes, hashed_bytes)
    except Exception:
        return False

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])

def register_user(db: Session, data: RegisterRequest) -> User:
    hashed_password = hash_password(data.password)
    client_code = auto_generate_client_code(db)
    user = User(
        first_name=data.first_name,
        last_name=data.last_name,
        phone=data.phone,
        email=data.email,
        password_hash=hashed_password,
        client_code=client_code,
        role="client"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
