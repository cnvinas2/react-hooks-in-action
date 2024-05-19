/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserPicker from './UserPicker'
import { useUser } from './UserContext'
import useFetch from '../../utils/useFetch'
import '@testing-library/jest-dom'

// Mocking the Spinner component
jest.mock('../UI/Spinner', () => () => (
  <div data-testid="spinner">Loading...</div>
))

// Mock the spinner component
jest.mock('../UI/Spinner', () => () => (
  <div data-testid="spinner">Mocked Spinner</div>
))

// Mocking the useUser context
jest.mock('./UserContext', () => ({
  useUser: jest.fn(),
}))

// Mocking the useFetch hook
jest.mock('../../utils/useFetch', () => jest.fn())

describe('UserPicker', () => {
  const mockSetUser = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useUser.mockReturnValue([null, mockSetUser])
  })

  it('renders loading spinner initially', () => {
    useFetch.mockReturnValue({ data: [], status: 'loading' })

    render(<UserPicker />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('renders error message on error', () => {
    useFetch.mockReturnValue({ data: [], status: 'error' })

    render(<UserPicker />)

    const errorMessage = screen.getByText('Error!')
    expect(errorMessage).toBeInTheDocument()
  })

  it('renders user options and handles selection', () => {
    const users = [
      { id: 1, name: 'User One' },
      { id: 2, name: 'User Two' },
    ]
    useFetch.mockReturnValue({ data: users, status: 'success' })
    useUser.mockReturnValue([users[0], mockSetUser])

    render(<UserPicker />)

    const select = screen.getByTestId('select')
    expect(select).toBeInTheDocument()
    expect(select.value).toBe('1')

    const options = screen.getAllByTestId('select-option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveTextContent('User One')
    expect(options[1]).toHaveTextContent('User Two')

    fireEvent.change(select, { target: { value: '2' } })
    expect(mockSetUser).toHaveBeenCalledWith(users[1])
  })
})
