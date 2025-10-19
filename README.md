# Student Food Preference Management System

A full-stack web application for managing student information and their food preferences.

## Features

- Add, update, and delete student records
- Store student names and food preferences
- Modern React frontend with responsive design
- RESTful API backend using Python Flask
- MySQL database for data persistence
- Automated CI/CD pipeline with GitHub Actions

## Tech Stack

### Frontend
- **React** - UI framework
- **Axios** - HTTP client for API calls
- **CSS3** - Styling

### Backend
- **Python 3.11** - Programming language
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **MySQL Connector** - Database connectivity

### Database
- **MySQL 8.0** - Relational database

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization (optional)
- **Docker Compose** - Multi-container orchestration

## Project Structure

```
.
├── backend/
│   ├── app.py              # Flask application
│   ├── config.py           # Configuration settings
│   ├── database.py         # Database operations
│   ├── requirements.txt    # Python dependencies
│   ├── schema.sql          # Database schema
│   ├── .env.example        # Environment variables template
│   └── Dockerfile          # Docker configuration for backend
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js    # Form component
│   │   │   ├── StudentForm.css
│   │   │   ├── StudentList.js    # List component
│   │   │   └── StudentList.css
│   │   ├── services/
│   │   │   └── api.js      # API service layer
│   │   ├── App.js          # Main App component
│   │   ├── App.css
│   │   ├── index.js        # Entry point
│   │   └── index.css
│   ├── package.json        # Node dependencies
│   ├── .env.example        # Environment variables template
│   ├── Dockerfile          # Docker configuration for frontend
│   └── nginx.conf          # Nginx configuration
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # GitHub Actions pipeline
├── docker-compose.yml      # Docker Compose configuration
└── README.md              # This file
```

## Prerequisites

### For Local Development
- Python 3.11 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- npm or yarn

### For Docker Deployment
- Docker
- Docker Compose

## Setup Instructions

### Option 1: Local Development Setup

#### 1. Database Setup

```bash
# Log into MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE student_db;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_password';
GRANT ALL PRIVILEGES ON student_db.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;

# Import schema
USE student_db;
SOURCE backend/schema.sql;
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env

# Edit .env file with your database credentials
# DB_HOST=localhost
# DB_USER=student_user
# DB_PASSWORD=student_password
# DB_NAME=student_db
# DB_PORT=3306

# Run the backend server
python app.py
```

The backend API will be available at `http://localhost:5000`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env file if needed (default should work)
# REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

### Option 2: Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (will delete database data)
docker-compose down -v
```

When using Docker:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MySQL: `localhost:3306`

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Request/Response Examples

#### Create Student
```bash
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "food_preference": "Vegetarian"
}
```

#### Response
```json
{
  "id": 1,
  "name": "John Doe",
  "food_preference": "Vegetarian",
  "message": "Student added successfully"
}
```

## Food Preference Options

- Vegetarian
- Vegan
- Non-Vegetarian
- Pescatarian
- Gluten-Free

## CI/CD Pipeline

The GitHub Actions pipeline automatically runs on:
- Push to `main`, `develop`, or `copilot/**` branches
- Pull requests to `main` or `develop` branches

### Pipeline Steps

1. **Backend Build and Test**
   - Set up Python environment
   - Install dependencies
   - Run linting (flake8)
   - Run tests

2. **Frontend Build and Test**
   - Set up Node.js environment
   - Install dependencies
   - Run tests
   - Build production bundle
   - Upload build artifacts

3. **Docker Build** (only on main branch)
   - Build Docker images

## Development

### Running Tests

#### Backend Tests
```bash
cd backend
pytest
```

#### Frontend Tests
```bash
cd frontend
npm test
```

### Building for Production

#### Backend
The backend runs directly with Python and doesn't require a build step.

#### Frontend
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/build` directory.

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `sudo service mysql status`
- Check credentials in `.env` file
- Ensure database and user exist
- Check firewall settings

### CORS Issues
- Ensure Flask-CORS is installed
- Verify the backend is allowing requests from the frontend origin
- Check browser console for specific CORS errors

### Frontend Not Loading
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache
- Check browser console for errors

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
