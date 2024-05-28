import React from 'react';
import { render } from '@testing-library/react';
import Booking from '../Booking';

describe('Booking Component', () => {
  const booking = {
    title: 'Meeting with Bob',
    date: '2024-05-25T14:00:00Z',
    session: 'Afternoon',
    notes: 'Discuss project details'
  };

  const bookable = {
    title: 'Conference Room 1'
  };

  test('renders booking details correctly', () => {
    const { getByText } = render(<Booking booking={booking} bookable={bookable} />);

    expect(getByText('Title')).not.toBeNull();
    expect(getByText('Meeting with Bob')).not.toBeNull();

    expect(getByText('Bookable')).not.toBeNull();
    expect(getByText('Conference Room 1')).not.toBeNull();

    expect(getByText('Booking Date')).not.toBeNull();
    expect(getByText(new Date('2024-05-25T14:00:00Z').toDateString())).not.toBeNull();

    expect(getByText('Session')).not.toBeNull();
    expect(getByText('Afternoon')).not.toBeNull();

    expect(getByText('Notes')).not.toBeNull();
    expect(getByText('Discuss project details')).not.toBeNull();
  });

  test('does not render notes when not provided', () => {
    const bookingWithoutNotes = { ...booking, notes: null };

    const { queryByText } = render(<Booking booking={bookingWithoutNotes} bookable={bookable} />);

    expect(queryByText('Notes')).toBeNull();
    expect(queryByText('Discuss project details')).toBeNull();
  });
});