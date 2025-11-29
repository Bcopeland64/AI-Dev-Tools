#!/bin/bash

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "Killing process on port $port (PID: $pid)"
        kill -9 $pid 2>/dev/null
    else
        echo "Port $port is clear."
    fi
}

echo "Stopping Python Tutor..."

# Clear ports
kill_port 5000  # Backend port
kill_port 5173  # Frontend default port
kill_port 5174  # Frontend fallback port
kill_port 5175  # Frontend fallback port

echo "All services stopped and ports cleared."
