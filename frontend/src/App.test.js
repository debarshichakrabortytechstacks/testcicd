import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock axios to prevent import errors
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} }))
}));

// Import App after mocking axios
import App from './App';

test('renders student food preference heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Student Food Preference Management/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders add new student section', () => {
  render(<App />);
  const addStudentHeading = screen.getByText(/Add New Student/i);
  expect(addStudentHeading).toBeInTheDocument();
});

test('renders students list section', () => {
  render(<App />);
  const listHeading = screen.getByText(/Students List/i);
  expect(listHeading).toBeInTheDocument();
});
