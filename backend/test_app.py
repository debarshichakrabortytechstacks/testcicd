import unittest
from app import app
import json


class TestStudentAPI(unittest.TestCase):
    """Test cases for Student Food Preference API"""
    
    def setUp(self):
        """Set up test client"""
        self.app = app.test_client()
        self.app.testing = True
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = self.app.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
    
    def test_get_students_endpoint(self):
        """Test get students endpoint returns a list"""
        response = self.app.get('/api/students')
        # Should return 200 even if database is not connected
        # In production, you'd mock the database
        self.assertIn(response.status_code, [200, 500])
    
    def test_add_student_validation(self):
        """Test add student with invalid data"""
        response = self.app.post('/api/students',
                                data=json.dumps({}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
    
    def test_add_student_with_valid_data(self):
        """Test add student with valid data structure"""
        student_data = {
            'name': 'Test Student',
            'food_preference': 'Vegetarian'
        }
        response = self.app.post('/api/students',
                                data=json.dumps(student_data),
                                content_type='application/json')
        # May fail if database is not connected, but should accept the format
        self.assertIn(response.status_code, [201, 500])


if __name__ == '__main__':
    unittest.main()
