import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookableForm from '../BookableForm';

const renderComponent = (props = {}) => {
  return render(
    <BrowserRouter>
      <BookableForm {...props} />
    </BrowserRouter>
  );
};

describe('BookableForm', () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockHandleChange = jest.fn();
  const mockHandleChecked = jest.fn();

  const formState = {
    state: {
      title: 'Test Title',
      group: 'Test Group',
      notes: 'Test Notes',
      days: ['Monday', 'Tuesday'],
      sessions: ['Morning', 'Afternoon']
    },
    handleChange: mockHandleChange,
    handleChecked: mockHandleChecked
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });


  

  test('calls handleChecked on checkbox change', () => {
    renderComponent({ formState, handleSubmit: mockHandleSubmit });

    const mondayCheckbox = screen.getByLabelText(/Monday/i);
    fireEvent.click(mondayCheckbox);

    expect(mockHandleChecked).toHaveBeenCalledTimes(1);
  });

  test('calls handleSubmit on save button click', () => {
    renderComponent({ formState, handleSubmit: mockHandleSubmit });

    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test('calls handleDelete on delete button click', () => {
    renderComponent({ formState, handleSubmit: mockHandleSubmit, handleDelete: mockHandleDelete });

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});