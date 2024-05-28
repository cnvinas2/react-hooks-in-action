import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookingForm from '../BookingForm';
import useFormState from '../../Bookables/useFormState';

// Mock the custom hook
jest.mock('../../Bookables/useFormState', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('BookingForm Component', () => {
  const booking = {
    id: 1,
    title: 'Meeting with Bob',
    date: '2024-05-25T14:00:00Z',
    session: 'Afternoon',
    notes: 'Discuss project details'
  };

  const bookable = {
    title: 'Conference Room 1'
  };

  const mockHandleChange = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnDelete = jest.fn();

  const mockUseFormState = useFormState as jest.Mock;

  beforeEach(() => {
    mockUseFormState.mockReturnValue({
      state: booking,
      handleChange: mockHandleChange
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

 

  test('calls onSave when the save button is clicked', () => {
    const { getByText } = render(
      <BookingForm booking={booking} bookable={bookable} onSave={mockOnSave} onDelete={mockOnDelete} />
    );

    fireEvent.click(getByText('Update'));
    expect(mockOnSave).toHaveBeenCalledWith(booking);
  });

  test('calls onDelete when the delete button is clicked', () => {
    const { getByText } = render(
      <BookingForm booking={booking} bookable={bookable} onSave={mockOnSave} onDelete={mockOnDelete} />
    );

    fireEvent.click(getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(booking);
  });

  test('does not render delete button for new booking', () => {
    const newBooking = { ...booking, id: undefined };
    mockUseFormState.mockReturnValue({
      state: newBooking,
      handleChange: mockHandleChange
    });

    const { queryByText } = render(
      <BookingForm booking={newBooking} bookable={bookable} onSave={mockOnSave} onDelete={mockOnDelete} />
    );

    expect(queryByText('Delete')).toBeNull();
  });
});