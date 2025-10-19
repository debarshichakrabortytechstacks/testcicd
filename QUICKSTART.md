# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- [ ] Python 3.11+ installed (`python --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] MySQL 8.0+ installed and running
- [ ] Git installed

## Quick Start with Scripts

### Windows
```bash
# Double-click start.bat or run:
start.bat
```

### Linux/Mac
```bash
# Make executable and run:
chmod +x start.sh
./start.sh
```

## Manual Setup

### 1. Database Setup

```sql
# Log into MySQL
mysql -u root -p

# Run the following commands:
CREATE DATABASE student_db;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_password';
GRANT ALL PRIVILEGES ON student_db.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;
USE student_db;
SOURCE backend/schema.sql;
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database credentials

python app.py
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env

npm start
```

Frontend runs on: http://localhost:3000

## Docker Setup (Easiest)

```bash
# Start all services
docker-compose up --build

# Stop services
docker-compose down
```

## Testing

### Backend Tests
```bash
cd backend
python -m unittest test_app.py
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Full Build Test
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
npm run build
```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get student by ID |
| POST | /api/students | Create new student |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |

### Example API Calls

#### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "food_preference": "Vegetarian"}'
```

#### Get All Students
```bash
curl http://localhost:5000/api/students
```

#### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "food_preference": "Vegan"}'
```

#### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/1
```

## Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac - Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Connection Failed
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists
- Test connection: `mysql -u student_user -p student_db`

### Module Not Found
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

## Food Preference Options

- Vegetarian
- Vegan
- Non-Vegetarian
- Pescatarian
- Gluten-Free

## Next Steps

1. Customize the food preference options in `frontend/src/components/StudentForm.js`
2. Add more fields to the student model
3. Implement authentication
4. Deploy to production

## Support

For issues, please check the main README.md or create an issue on GitHub.
