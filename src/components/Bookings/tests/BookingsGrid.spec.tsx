import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingsGrid from '../BookingsGrid'; // Update the path as necessary
import { useBookings, useGrid } from '../bookingsHooks';

jest.mock('../bookingsHooks'); // Mock the hooks module

describe('BookingsGrid component', () => {
  const mockUseBookings = useBookings as jest.Mock;
  const mockUseGrid = useGrid as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  it('renders loading state while waiting for data', () => {
    mockUseBookings.mockReturnValue({ status: 'pending', bookings: null, error: null });
    mockUseGrid.mockReturnValue({ grid: null, sessions: [], dates: [] });

    render(<BookingsGrid bookable={{ id: 1 }} week={{ start: new Date(), end: new Date() }} />);

    expect(screen.getByText('Waiting for bookable and week details...')).toBeInTheDocument();
  });


 
});
