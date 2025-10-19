from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Database

app = Flask(__name__)
CORS(app)

db = Database()

@app.before_request
def before_request():
    """Connect to database before each request"""
    if not db.connection or not db.connection.is_connected():
        db.connect()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'API is running'}), 200

@app.route('/api/students', methods=['GET'])
def get_students():
    """Get all students"""
    students = db.get_all_students()
    return jsonify(students), 200

@app.route('/api/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """Get a specific student"""
    student = db.get_student_by_id(student_id)
    if student:
        return jsonify(student), 200
    return jsonify({'error': 'Student not found'}), 404

@app.route('/api/students', methods=['POST'])
def add_student():
    """Add a new student"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'food_preference' not in data:
        return jsonify({'error': 'Name and food preference are required'}), 400
    
    student_id = db.add_student(data['name'], data['food_preference'])
    
    if student_id:
        return jsonify({
            'id': student_id,
            'name': data['name'],
            'food_preference': data['food_preference'],
            'message': 'Student added successfully'
        }), 201
    
    return jsonify({'error': 'Failed to add student'}), 500

@app.route('/api/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update an existing student"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'food_preference' not in data:
        return jsonify({'error': 'Name and food preference are required'}), 400
    
    success = db.update_student(student_id, data['name'], data['food_preference'])
    
    if success:
        return jsonify({
            'id': student_id,
            'name': data['name'],
            'food_preference': data['food_preference'],
            'message': 'Student updated successfully'
        }), 200
    
    return jsonify({'error': 'Failed to update student'}), 500

@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student"""
    success = db.delete_student(student_id)
    
    if success:
        return jsonify({'message': 'Student deleted successfully'}), 200
    
    return jsonify({'error': 'Failed to delete student'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
