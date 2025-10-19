-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS student_db;

-- Use the database
USE student_db;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    food_preference VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO students (name, food_preference) VALUES
    ('John Doe', 'Vegetarian'),
    ('Jane Smith', 'Vegan'),
    ('Bob Johnson', 'Non-Vegetarian');
