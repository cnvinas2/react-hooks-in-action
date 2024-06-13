// WeekPicker.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeekPicker from '../WeekPicker';
import { getWeek } from '../../../utils/date-wrangler';

// Mocking the date-wrangler utility
jest.mock('../../../utils/date-wrangler', () => ({
  getWeek: jest.fn((date) => ({
    start: new Date(date),
    end: new Date(new Date(date).setDate(new Date(date).getDate() + 6))
  }))
}));

const initialDate = '2020-06-24';

describe('WeekPicker Component', () => {
  test('renders correctly', () => {
    render(<WeekPicker date={initialDate} />);

    expect(screen.getByPlaceholderText('e.g. 2020-09-02')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('dispatches PREV_WEEK action', () => {
    render(<WeekPicker date={initialDate} />);

    fireEvent.click(screen.getByText('Prev'));
    expect(getWeek).toHaveBeenCalled();
  });

  test('dispatches TODAY action', () => {
    render(<WeekPicker date={initialDate} />);

    fireEvent.click(screen.getByText('Today'));
    expect(getWeek).toHaveBeenCalled();
  });



  test('dispatches NEXT_WEEK action', () => {
    render(<WeekPicker date={initialDate} />);

    fireEvent.click(screen.getByText('Next'));
    expect(getWeek).toHaveBeenCalled();
  });
});
