import React from 'react';
import './StudentList.css';

function StudentList({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return <p className="no-students">No students found. Add your first student above!</p>;
  }

  return (
    <div className="student-list">
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Food Preference</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <span className={`preference-badge preference-${student.food_preference.toLowerCase().replace(/[^a-z]/g, '')}`}>
                  {student.food_preference}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(student)}
                    title="Edit student"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(student.id)}
                    title="Delete student"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
