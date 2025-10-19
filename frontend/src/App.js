import React, { useState, useEffect } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudents, addStudent, updateStudent, deleteStudent } from './services/api';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students. Please make sure the backend is running.');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      setError(null);
      await addStudent(studentData);
      await loadStudents();
    } catch (err) {
      setError('Failed to add student.');
      console.error('Error adding student:', err);
    }
  };

  const handleUpdateStudent = async (id, studentData) => {
    try {
      setError(null);
      await updateStudent(id, studentData);
      await loadStudents();
      setEditingStudent(null);
    } catch (err) {
      setError('Failed to update student.');
      console.error('Error updating student:', err);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setError(null);
        await deleteStudent(id);
        await loadStudents();
      } catch (err) {
        setError('Failed to delete student.');
        console.error('Error deleting student:', err);
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Food Preference Management</h1>
      </header>
      
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        <div className="content-container">
          <div className="form-section">
            <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <StudentForm
              onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
              editingStudent={editingStudent}
              onCancel={handleCancelEdit}
            />
          </div>
          
          <div className="list-section">
            <h2>Students List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <StudentList
                students={students}
                onEdit={handleEdit}
                onDelete={handleDeleteStudent}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
