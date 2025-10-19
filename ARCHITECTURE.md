# Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions CI/CD                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Backend    │  │   Frontend   │  │  Docker Build    │   │
│  │  Build/Test │  │  Build/Test  │  │  (Production)    │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Stack                         │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                Frontend (React)                        │  │
│  │  - React 18                                            │  │
│  │  - Axios for API calls                                 │  │
│  │  - Responsive CSS                                      │  │
│  │  - Port: 3000                                          │  │
│  └────────────────────┬──────────────────────────────────┘  │
│                       │                                      │
│                       │ HTTP/REST API                        │
│                       │                                      │
│  ┌────────────────────▼──────────────────────────────────┐  │
│  │            Backend (Python/Flask)                      │  │
│  │  - Flask 3.0                                           │  │
│  │  - Flask-CORS                                          │  │
│  │  - RESTful API endpoints                               │  │
│  │  - Port: 5000                                          │  │
│  └────────────────────┬──────────────────────────────────┘  │
│                       │                                      │
│                       │ MySQL Connector                      │
│                       │                                      │
│  ┌────────────────────▼──────────────────────────────────┐  │
│  │            Database (MySQL 8.0)                        │  │
│  │  - student_db                                          │  │
│  │  - students table                                      │  │
│  │  - Port: 3306                                          │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### Frontend (React)
**Location**: `/frontend`

**Key Files**:
- `src/App.js` - Main application component
- `src/components/StudentForm.js` - Add/Edit form
- `src/components/StudentList.js` - Student list display
- `src/services/api.js` - API communication layer

**Features**:
- Add new students
- Edit existing students
- Delete students
- View all students
- Real-time form validation

### Backend (Python/Flask)
**Location**: `/backend`

**Key Files**:
- `app.py` - Flask application and API routes
- `database.py` - Database operations (CRUD)
- `config.py` - Configuration management

**API Endpoints**:
```
GET    /api/health              - Health check
GET    /api/students            - List all students
GET    /api/students/:id        - Get specific student
POST   /api/students            - Create student
PUT    /api/students/:id        - Update student
DELETE /api/students/:id        - Delete student
```

### Database (MySQL)
**Location**: `/backend/schema.sql`

**Schema**:
```sql
students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  food_preference VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

## Data Flow

### Creating a Student
```
User Input (Frontend)
    │
    ▼
StudentForm Component
    │
    ▼
api.addStudent()
    │
    ▼
POST /api/students (Backend)
    │
    ▼
db.add_student() (Database Layer)
    │
    ▼
MySQL INSERT Query
    │
    ▼
Response → Frontend → Update UI
```

### Reading Students
```
App Component Mount
    │
    ▼
api.getStudents()
    │
    ▼
GET /api/students (Backend)
    │
    ▼
db.get_all_students() (Database Layer)
    │
    ▼
MySQL SELECT Query
    │
    ▼
JSON Response → Frontend → StudentList Component
```

## Deployment Options

### Option 1: Local Development
- Run backend and frontend separately
- Use local MySQL instance
- Best for development

### Option 2: Docker Compose
- All services in containers
- Automated setup
- Best for testing and demos

### Option 3: Production Deployment
- Frontend: Deploy build to Nginx/Apache/Netlify/Vercel
- Backend: Deploy to AWS/Heroku/DigitalOcean
- Database: Use managed MySQL (AWS RDS, etc.)

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.2.0 |
| Frontend | Axios | 1.6.0 |
| Frontend | React Scripts | 5.0.1 |
| Backend | Python | 3.11+ |
| Backend | Flask | 3.0.0 |
| Backend | Flask-CORS | 4.0.0 |
| Backend | MySQL Connector | 8.2.0 |
| Database | MySQL | 8.0 |
| CI/CD | GitHub Actions | - |
| Container | Docker | - |
| Container | Docker Compose | - |

## Security Considerations

1. **Environment Variables**: Sensitive data in `.env` files
2. **CORS**: Configured for development (should be restricted in production)
3. **Input Validation**: Frontend and backend validation
4. **SQL Injection**: Using parameterized queries
5. **Error Handling**: Proper error messages without exposing internals

## Performance Considerations

1. **Database Indexing**: Primary key on `id`
2. **Connection Pooling**: Consider adding for high traffic
3. **Caching**: Can add Redis for session management
4. **CDN**: For static assets in production
5. **Compression**: Enable gzip compression

## Testing Strategy

### Unit Tests
- **Backend**: Python unittest
- **Frontend**: Jest + React Testing Library

### Integration Tests
- API endpoint testing
- Database operations

### E2E Tests
- User workflows
- Form submissions
- CRUD operations

## Monitoring & Logging

### Backend Logging
- Console output for development
- Can add file logging or external service

### Error Tracking
- Console errors in development
- Consider Sentry or similar in production

### Health Checks
- `/api/health` endpoint
- Database connection status

## Scaling Considerations

### Horizontal Scaling
- Run multiple backend instances behind load balancer
- Shared database or read replicas

### Vertical Scaling
- Increase server resources
- Optimize database queries

### Database Scaling
- Master-slave replication
- Sharding for very large datasets

## Future Enhancements

1. **Authentication & Authorization**
   - User login
   - JWT tokens
   - Role-based access

2. **Additional Features**
   - Search and filtering
   - Pagination
   - Sorting
   - Export to CSV/PDF

3. **Advanced Food Preferences**
   - Multiple allergies
   - Dietary restrictions
   - Meal planning

4. **Notifications**
   - Email notifications
   - SMS alerts
   - Push notifications

5. **Analytics Dashboard**
   - Food preference statistics
   - Charts and graphs
   - Reports generation
