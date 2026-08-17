# Карго KG — Доставка из Китая в Кыргызстан

Полноценный веб-сайт для сервиса доставки товаров из Китая в Кыргызстан с системой отслеживания посылок.

---

## 🚀 Быстрый запуск (Docker)

### 1. Клонируй / открой папку проекта

```bash
cd cargo-kg
```

### 2. Настрой переменные окружения

Отредактируй `.env` файл — укажи реальные данные:

```env
WHATSAPP_NUMBER=996700123456       # Твой номер WhatsApp
TELEGRAM_USERNAME=your_telegram    # Твой Telegram username
COMPANY_PHONE=+996 700 123 456
COMPANY_EMAIL=info@your-domain.kg
COMPANY_ADDRESS=г. Бишкек, ул. ...
ADMIN_EMAIL=admin@your-domain.kg
ADMIN_PASSWORD=YourSecurePassword!
```

### 3. Запусти проект

```bash
docker compose up --build
```

Первый запуск занимает ~3-5 минут (сборка образов + установка зависимостей).

### 4. Открой в браузере

| Сервис | URL |
|--------|-----|
| 🌐 Сайт | http://localhost |
| 📡 API Docs | http://localhost/api/docs |
| 🔒 Admin | http://localhost/admin |

---

## 👤 Тестовые аккаунты (создаются автоматически)

| Роль | Email | Пароль |
|------|-------|--------|
| Admin | admin@cargo-kg.com | Admin1234! |
| Manager | manager@cargo-kg.com | Manager1234! |
| Client | client@cargo-kg.com | Client1234! |

### Тестовые трек-коды:

| Трек-код | Статус |
|----------|--------|
| CN202600001 | Выдан клиенту |
| CN202600002 | В пути |
| CN202600003 | Принят на склад в Китае |

**Код клиента для тестирования:** `KG1001`

---

## 🏗 Архитектура

```
cargo-kg/
├── docker-compose.yml      # Оркестрация сервисов
├── .env                    # Конфигурация (секреты)
├── nginx/
│   └── nginx.conf          # Reverse proxy
├── backend/                # FastAPI + PostgreSQL
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── alembic/            # Миграции БД
│   └── app/
│       ├── main.py         # Точка входа
│       ├── config.py       # Настройки из .env
│       ├── database.py     # SQLAlchemy
│       ├── models/         # ORM модели
│       ├── schemas/        # Pydantic v2
│       ├── routers/        # API endpoints
│       ├── services/       # Бизнес-логика
│       ├── dependencies.py # Auth dependencies
│       └── seed.py         # Тестовые данные
└── frontend/               # React + Vite + Tailwind
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── context/        # AuthContext
        ├── api/            # Axios instance
        ├── components/     # Переиспользуемые компоненты
        ├── pages/          # Страницы
        └── utils/          # Константы, хелперы
```

---

## 📡 API Endpoints

### Public (без авторизации)
```
GET  /api/health
POST /api/auth/register
POST /api/auth/login
GET  /api/shipments/track/{track_code}
GET  /api/shipments/client/{client_code}
GET  /api/shipments/{id}
GET  /api/shipments/{id}/history
```

### Authorized (JWT required)
```
GET    /api/auth/me
PATCH  /api/auth/me
POST   /api/auth/change-password
```

### Admin (manager/admin role)
```
GET/POST/PATCH/DELETE /api/admin/clients
GET/POST/PATCH/DELETE /api/admin/shipments
POST /api/admin/shipments/{id}/status
GET  /api/admin/stats
```

---

## 🛠 Разработка без Docker

### Backend

```bash
cd backend

# Создать виртуальное окружение
python -m venv venv
venv\Scripts\activate  # Windows

# Установить зависимости
pip install -r requirements.txt

# Запустить (нужен PostgreSQL или SQLite для разработки)
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend

# Установить зависимости
npm install

# Запустить dev server (proxy /api → localhost:8000)
npm run dev
```

Откроется на http://localhost:5173

---

## 🔐 Безопасность

- Пароли хранятся только в хешированном виде (bcrypt)
- JWT access tokens с истечением
- Role-based access control (client / manager / admin)
- CORS настроен
- SQL injection защита (SQLAlchemy ORM)
- Все секреты в `.env` — не коммить в git!

---

## 📱 Страницы сайта

| Маршрут | Описание |
|---------|----------|
| `/` | Главная страница |
| `/tracking` | Отслеживание посылок |
| `/services` | Услуги |
| `/tariffs` | Тарифы + калькулятор |
| `/faq` | Часто задаваемые вопросы |
| `/contacts` | Контакты |
| `/login` | Вход |
| `/register` | Регистрация |
| `/profile` | Личный кабинет |
| `/my-shipments` | Мои посылки |
| `/shipments/:id` | Детали посылки |
| `/admin` | Admin Dashboard |
| `/admin/clients` | Управление клиентами |
| `/admin/shipments` | Управление посылками |
| `/admin/settings` | Настройки |

---

## 📊 Статусы посылок

| Код | Отображение |
|-----|------------|
| `received_in_china` | Принят на склад в Китае |
| `sent_from_china` | Выехал со склада |
| `in_transit` | В пути |
| `customs` | На таможне |
| `arrived_bishkek` | Прибыл в Бишкек |
| `ready_for_pickup` | Готов к выдаче |
| `delivered` | Выдан клиенту |

---

© 2026 Карго KG
