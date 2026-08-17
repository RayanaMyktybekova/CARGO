from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./cargo.db"
    JWT_SECRET_KEY: str = "super_secret_key"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALLOWED_ORIGINS: str = "*"
    DEBUG: bool = False

    ADMIN_EMAIL: str = "admin@cargo-kg.com"
    ADMIN_PASSWORD: str = "Admin123!"
    ADMIN_FIRST_NAME: str = "Admin"
    ADMIN_LAST_NAME: str = "User"

    WHATSAPP_NUMBER: str = "+996123456789"
    TELEGRAM_USERNAME: str = "@cargokg"
    COMPANY_PHONE: str = "+996123456789"
    COMPANY_EMAIL: str = "info@cargo-kg.com"
    COMPANY_ADDRESS: str = "Bishkek, Kyrgyzstan"
    WORKING_HOURS: str = "Mon-Fri 09:00-18:00"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def allowed_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")] if self.ALLOWED_ORIGINS else ["*"]

settings = Settings()
