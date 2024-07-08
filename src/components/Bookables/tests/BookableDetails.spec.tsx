import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookableDetails from '../BookableDetails';

// Mock data
const bookable = {
  title: 'Test Bookable',
  notes: 'Some notes about the bookable item.',
  days: [0, 1, 2],
  sessions: [0, 1]
};

jest.mock('../../../static.json', () => ({
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  sessions: ['Morning', 'Afternoon', 'Evening']
}));

describe('BookableDetails', () => {
  test('renders correctly with bookable data', () => {
    render(<BookableDetails bookable={bookable} />);

    expect(screen.getByText('Test Bookable')).not.toBeNull();
    expect(screen.getByText('Some notes about the bookable item.')).not.toBeNull();
    expect(screen.getByText('Monday')).not.toBeNull();
    expect(screen.getByText('Tuesday')).not.toBeNull();
    expect(screen.getByText('Wednesday')).not.toBeNull();
    expect(screen.getByText('Morning')).not.toBeNull();
    expect(screen.getByText('Afternoon')).not.toBeNull();
  });

  test('toggles details correctly', () => {
    render(<BookableDetails bookable={bookable} />);

    const checkbox = screen.getByLabelText('Show Details');

    // Toggle off
    fireEvent.click(checkbox);
    expect(screen.queryByText('Monday')).toBeNull();
    expect(screen.queryByText('Morning')).toBeNull();

    // Toggle on
    fireEvent.click(checkbox);
    expect(screen.getByText('Monday')).not.toBeNull();
    expect(screen.getByText('Morning')).not.toBeNull();
  });

  test('renders null if no bookable data is provided', () => {
    const { container } = render(<BookableDetails bookable={null} />);
    expect(container.firstChild).toBeNull();
  });
});