FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
# Railway sets PORT env variable dynamically — use shell form to read it
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}

