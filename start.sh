#!/bin/bash

# Configurable ports
BACKEND_PORT=8000
FRONTEND_PORT=5173

# Kill processes using the backend port
echo "🔍 Checking for process on port $BACKEND_PORT..."
PID=$(lsof -ti tcp:$BACKEND_PORT)
if [ -n "$PID" ]; then
  echo "⚠️  Killing process on port $BACKEND_PORT (PID: $PID)"
  kill -9 $PID
else
  echo "✅ No process found on port $BACKEND_PORT"
fi

# Kill processes using the frontend port
echo "🔍 Checking for process on port $FRONTEND_PORT..."
PID=$(lsof -ti tcp:$FRONTEND_PORT)
if [ -n "$PID" ]; then
  echo "⚠️  Killing process on port $FRONTEND_PORT (PID: $PID)"
  kill -9 $PID
else
  echo "✅ No process found on port $FRONTEND_PORT"
fi

# Start backend
echo "🚀 Starting FastAPI backend..."
cd backend
source venv/bin/activate
uvicorn openai_service:app --reload --port $BACKEND_PORT &
BACKEND_PID=$!
cd ..

# Start frontend
echo "🌐 Starting React frontend..."
cd frontend
npm run dev -- --port $FRONTEND_PORT &
FRONTEND_PID=$!
cd ..

# Wait for both
wait $BACKEND_PID $FRONTEND_PID