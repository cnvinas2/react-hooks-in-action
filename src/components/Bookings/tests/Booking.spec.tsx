import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Booking from '../Booking';

// Mock data
const booking = {
  title: 'Meeting',
  date: '2024-07-04T10:00:00Z',
  session: 'Morning',
  notes: 'Bring documents'
};

const bookable = {
  title: 'Conference Room'
};

describe('Booking', () => {
  test('renders correctly with booking and bookable data', () => {
    render(<Booking booking={booking} bookable={bookable} />);

    expect(screen.getByText('Meeting')).not.toBeNull();
    expect(screen.getByText('Conference Room')).not.toBeNull();
    expect(screen.getByText('Thu Jul 04 2024')).not.toBeNull();
    expect(screen.getByText('Morning')).not.toBeNull();
    expect(screen.getByText('Bring documents')).not.toBeNull();
  });

  test('renders correctly without notes', () => {
    const bookingWithoutNotes = {
      ...booking,
      notes: null
    };

    render(<Booking booking={bookingWithoutNotes} bookable={bookable} />);

    expect(screen.getByText('Meeting')).not.toBeNull();
    expect(screen.getByText('Conference Room')).not.toBeNull();
    expect(screen.getByText('Thu Jul 04 2024')).not.toBeNull();
    expect(screen.getByText('Morning')).not.toBeNull();
    expect(screen.queryByText('Notes')).toBeNull();
  });

  test('renders null if no booking data is provided', () => {
    const { container } = render(<Booking booking={null} bookable={bookable} />);
    expect(container.firstChild).toBeNull();
  });
});