/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import BookableEdit from '../BookableEdit';
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
  useMutation: jest.fn(),
  useQuery: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));
jest.mock('../../../utils/api', () => ({
  getData: jest.fn(),
  editItem: jest.fn(),
  deleteItem: jest.fn()
}));

const queryClient = new QueryClient();

const renderComponent = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BookableEdit />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('BookableEdit', () => {
  const mockUseFormState = useFormState as jest.Mock;
  const mockBookableForm = BookableForm as jest.Mock;
  const mockPageSpinner = PageSpinner as jest.Mock;
  const mockUseQueryClient = require('react-query').useQueryClient as jest.Mock;
  const mockUseMutation = require('react-query').useMutation as jest.Mock;
  const mockUseQuery = require('react-query').useQuery as jest.Mock;
  const mockUseNavigate = require('react-router-dom').useNavigate as jest.Mock;
  const mockUseParams = require('react-router-dom').useParams as jest.Mock;

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
      isLoading: false,
      isError: false,
      error: null
    });
    mockUseQuery.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null
    });
    mockUseNavigate.mockReturnValue(jest.fn());
    mockUseParams.mockReturnValue({ id: '1' });
  });


  test('handles submit', async () => {
    const data = { id: 1, name: 'Test Bookable' };
    const mockMutate = jest.fn();
    mockUseQuery.mockReturnValueOnce({
      data,
      isLoading: false,
      isError: false,
      error: null
    });
    mockUseMutation.mockReturnValueOnce({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      error: null
    });

    renderComponent();

    fireEvent.click(screen.getByText('BookableForm'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(data);
    });
  });

  test('handles delete', async () => {
    window.confirm = jest.fn().mockReturnValue(true);
    const data = { id: 1, name: 'Test Bookable' };
    const mockMutate = jest.fn();
    mockUseQuery.mockReturnValueOnce({
      data,
      isLoading: false,
      isError: false,
      error: null
    });
    mockUseMutation.mockReturnValueOnce({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      error: null
    });

    renderComponent();

    fireEvent.click(screen.getByText('BookableForm'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(data);
    });
  });
});