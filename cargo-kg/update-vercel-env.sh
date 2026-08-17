#!/bin/bash
# После того как получишь Railway URL — запусти эту команду:
# Замени YOUR_RAILWAY_URL на реальный URL

RAILWAY_URL="https://your-backend.up.railway.app"

cd frontend

# Установи переменную окружения на Vercel
vercel env add VITE_API_URL production <<< "$RAILWAY_URL"

# Передеплой с новым URL
vercel --prod
