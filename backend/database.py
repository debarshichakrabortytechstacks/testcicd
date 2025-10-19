import mysql.connector
from mysql.connector import Error
from config import Config

class Database:
    """Database connection and operations"""
    
    def __init__(self):
        self.connection = None
        
    def connect(self):
        """Create database connection"""
        try:
            self.connection = mysql.connector.connect(
                host=Config.DB_HOST,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD,
                database=Config.DB_NAME,
                port=Config.DB_PORT
            )
            if self.connection.is_connected():
                print("Successfully connected to MySQL database")
                return True
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            return False
    
    def disconnect(self):
        """Close database connection"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("MySQL connection closed")
    
    def get_all_students(self):
        """Retrieve all students from database"""
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM students ORDER BY id DESC")
            students = cursor.fetchall()
            cursor.close()
            return students
        except Error as e:
            print(f"Error fetching students: {e}")
            return []
    
    def get_student_by_id(self, student_id):
        """Retrieve a specific student by ID"""
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM students WHERE id = %s", (student_id,))
            student = cursor.fetchone()
            cursor.close()
            return student
        except Error as e:
            print(f"Error fetching student: {e}")
            return None
    
    def add_student(self, name, food_preference):
        """Add a new student to database"""
        try:
            cursor = self.connection.cursor()
            query = "INSERT INTO students (name, food_preference) VALUES (%s, %s)"
            cursor.execute(query, (name, food_preference))
            self.connection.commit()
            student_id = cursor.lastrowid
            cursor.close()
            return student_id
        except Error as e:
            print(f"Error adding student: {e}")
            return None
    
    def update_student(self, student_id, name, food_preference):
        """Update an existing student"""
        try:
            cursor = self.connection.cursor()
            query = "UPDATE students SET name = %s, food_preference = %s WHERE id = %s"
            cursor.execute(query, (name, food_preference, student_id))
            self.connection.commit()
            cursor.close()
            return True
        except Error as e:
            print(f"Error updating student: {e}")
            return False
    
    def delete_student(self, student_id):
        """Delete a student from database"""
        try:
            cursor = self.connection.cursor()
            cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))
            self.connection.commit()
            cursor.close()
            return True
        except Error as e:
            print(f"Error deleting student: {e}")
            return False
