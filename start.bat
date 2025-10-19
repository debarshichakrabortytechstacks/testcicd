@echo off
echo Starting Student Food Preference Application...

REM Start backend
echo.
echo Starting Backend Server...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate
pip install -r requirements.txt >nul 2>&1

if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
    echo Please update .env with your database credentials
)

start "Backend Server" cmd /k python app.py

REM Start frontend
echo.
echo Starting Frontend Server...
cd ..\frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

if not exist ".env" (
    copy .env.example .env
)

start "Frontend Server" cmd /k npm start

echo.
echo Application started successfully!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
