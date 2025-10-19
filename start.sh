#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Starting Student Food Preference Application..."

# Check if MySQL is running
echo -e "\n${GREEN}Checking MySQL service...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}MySQL is not installed. Please install MySQL first.${NC}"
    exit 1
fi

# Start backend
echo -e "\n${GREEN}Starting Backend Server...${NC}"
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${RED}Please update .env with your database credentials${NC}"
fi

python app.py &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Start frontend
echo -e "\n${GREEN}Starting Frontend Server...${NC}"
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

npm start &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"

echo -e "\n${GREEN}Application started successfully!${NC}"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Trap Ctrl+C and kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Wait for processes
wait
