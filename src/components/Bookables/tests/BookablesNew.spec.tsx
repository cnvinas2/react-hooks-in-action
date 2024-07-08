/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import BookableNew from '../BookableNew';
import useFormState from '../useFormState';
import BookableForm from '../BookableForm';
import PageSpinner from '../../UI/PageSpinner';

// Mock the dependencies
jest.mock('../useFormState');
jest.mock('../BookableForm');
jest.mock('../../UI/PageSpinner');
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQueryClient: jest.fn(),
  useMutation: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
jest.mock('../../../utils/api', () => ({
  createItem: jest.fn()
}));

const queryClient = new QueryClient();

const renderComponent = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BookableNew />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('BookableNew', () => {
  const mockUseFormState = useFormState as jest.Mock;
  const mockBookableForm = BookableForm as jest.Mock;
  const mockPageSpinner = PageSpinner as jest.Mock;
  const mockUseQueryClient = require('react-query').useQueryClient as jest.Mock;
  const mockUseMutation = require('react-query').useMutation as jest.Mock;
  const mockUseNavigate = require('react-router-dom').useNavigate as jest.Mock;
  const mockCreateItem = require('../../../utils/api').createItem as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormState.mockReturnValue({
      state: {},
      setState: jest.fn()
    });
    mockBookableForm.mockReturnValue(<div>BookableForm</div>);
    mockPageSpinner.mockReturnValue(<div>PageSpinner</div>);
    mockUseQueryClient.mockReturnValue({
      getQueryData: jest.fn().mockReturnValue([]),
      setQueryData: jest.fn()
    });
    mockUseMutation.mockReturnValue({
      mutate: jest.fn(),
      status: 'idle',
      error: null
    });
    mockUseNavigate.mockReturnValue(jest.fn());
  });

  test('renders BookableForm', () => {
    renderComponent();
    expect(screen.getByText('BookableForm')).not.toBeNull();
  });

  test('renders loading spinner', () => {
    mockUseMutation.mockReturnValueOnce({
      mutate: jest.fn(),
      status: 'loading',
      error: null
    });

    renderComponent();

    expect(screen.getByText('PageSpinner')).not.toBeNull();
  });

  test('renders error message', () => {
    const error = new Error('Error creating bookable');
    mockUseMutation.mockReturnValueOnce({
      mutate: jest.fn(),
      status: 'error',
      error
    });

    renderComponent();

    expect(screen.getByText(error.message)).not.toBeNull();
  });

});
