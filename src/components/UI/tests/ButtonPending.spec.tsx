// ButtonPending.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonPending from '../ButtonPending';

describe('ButtonPending Component', () => {
  test('renders correctly with children', () => {
    render(<ButtonPending onClick={() => {}}>Click Me</ButtonPending>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonPending onClick={handleClick}>Click Me</ButtonPending>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  test('passes additional props to the button', () => {
    render(
      <ButtonPending onClick={() => {}} className="extra-class">
        Click Me
      </ButtonPending>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('extra-class');
  });
});

