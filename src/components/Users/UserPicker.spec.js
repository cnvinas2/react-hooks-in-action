import React from 'react';
import useFetch from '../../utils/useFetch';
import App from '../App';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';


// Mock the fetchData function
jest.mock('../../utils/useFetch');

// Mock the spinner component
jest.mock('../UI/Spinner', () => () => <div data-testid="spinner">Mocked Spinner</div>);

describe('UserPicker', () => {
  it('renders spinner when isLoading is true', () => {
    const { getByTestId } = render(<App />);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument;
  });

  it.only('renders users content when isLoading is false', () => {
    // Mock useState to set isLoading to false
    useFetch.mockReturnValue({data: [{id:1, name: 'chris'}], status: 'done'});
    const { queryByTestId } = render(<App />);
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeNull;
  });

});
/*describe('useFetch', () => {
  it('fetches data successfully', async () => {
    // Mock data to be returned by the fetch call
    const mockData = {                                                                                                                    
      data: {users:[1]},
      status: 'done'
    };
    
    // Mock the global fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useFetch('http://localhost:3001/users'));

    // Wait for the hook to fetch data
    await waitForNextUpdate();

    console.log(result.current)

    // Assertions
    expect(result.current.loading).toBe(false); // Ensure loading state is false
    expect(result.current.error).toBe(null); // Ensure no error occurred
    expect(result.current.data).toEqual(mockData); // Ensure fetched data is correct
  });
});*/


// Mockear la función fetch global
/*global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: users = [], status: 'done' }),
  })
);

describe('UserPicker', () => {
    test('should fetch data from API', async () => {
        const url = "http://localhost:3001/users";        
        // Renderizar el custom hook
        fetch.mockImplementationOnce(()=> Promise.resolve());
        
        console.log(context)
        // Verificar que el resultado del custom hook es el esperado
        expect(fetch).toHaveBeenCalledWith("http://localhost:3001/users");
      });
})*/