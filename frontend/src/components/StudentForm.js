import React, { useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm({ onSubmit, editingStudent, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    food_preference: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        food_preference: editingStudent.food_preference
      });
    } else {
      setFormData({
        name: '',
        food_preference: ''
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.food_preference.trim()) {
      if (editingStudent) {
        onSubmit(editingStudent.id, formData);
      } else {
        onSubmit(formData);
      }
      setFormData({ name: '', food_preference: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', food_preference: '' });
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Student Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="food_preference">Food Preference:</label>
        <select
          id="food_preference"
          name="food_preference"
          value={formData.food_preference}
          onChange={handleChange}
          required
        >
          <option value="">Select preference</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Pescatarian">Pescatarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
        {editingStudent && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
