#!/bin/bash

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "Killing process on port $port (PID: $pid)"
        kill -9 $pid 2>/dev/null
        sleep 0.5
    fi
}

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
}

trap cleanup EXIT

echo "Starting Python Tutor..."

# Clear ports before starting
echo "Clearing ports..."
kill_port 5000  # Backend port
kill_port 5173  # Frontend default port
kill_port 5174  # Frontend fallback port
kill_port 5175  # Frontend fallback port

# Give the OS time to release the ports
sleep 1

# Start Backend
echo "Starting Backend..."
python3 backend/app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both
wait $BACKEND_PID $FRONTEND_PID
