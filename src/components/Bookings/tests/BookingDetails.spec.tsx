import React from 'react';
import { render } from '@testing-library/react';
import BookingDetails from '../BookingDetails';
import { useUser } from '../../Users/UserContext';

// Mock the custom hook
jest.mock('../../Users/UserContext', () => ({
    useUser: jest.fn()
  }));
  
  describe('BookingDetails Component', () => {
    const booking = {
      bookerId: 1,
      title: 'Meeting with Bob',
      date: '2024-05-25T14:00:00Z',
      session: 'Afternoon',
      notes: 'Discuss project details'
    };
  
    const bookable = {
      title: 'Conference Room 1'
    };
  
    const mockUser = { id: 1, name: 'Alice' };
    const mockUseUser = useUser as jest.Mock;
  
    beforeEach(() => {
      mockUseUser.mockReturnValue([mockUser]);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

  test('renders booking details correctly when a booking is provided', () => {
    const { getByText } = render(<BookingDetails booking={booking} bookable={bookable} />);

    expect(getByText('Booking Details')).not.toBeNull();
    expect(getByText('Meeting with Bob')).not.toBeNull();
    expect(getByText('Conference Room 1')).not.toBeNull();
    expect(getByText(new Date('2024-05-25T14:00:00Z').toDateString())).not.toBeNull();
    expect(getByText('Afternoon')).not.toBeNull();
    expect(getByText('Discuss project details')).not.toBeNull();
  });

  test('renders edit button when the current user is the booker', () => {
    const { getByRole } = render(<BookingDetails booking={booking} bookable={bookable} />);

    const button = getByRole('button');
    expect(button).not.toBeNull();
  });

  test('does not render edit button when the current user is not the booker', () => {
    mockUseUser.mockReturnValue([{ id: 2, name: 'Bob' }]);
    
    const { queryByRole } = render(<BookingDetails booking={booking} bookable={bookable} />);

    const button = queryByRole('button');
    expect(button).toBeNull();
  });

});