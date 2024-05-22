/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UsersList from './UsersList'
import useFetch from '../../utils/useFetch'

// Mock the useFetch hook
jest.mock('../../utils/useFetch')
jest.mock('../UI/Spinner', () => () => <div>Spinner</div>)

describe('UsersList component', () => {
  const mockSetUser = jest.fn()
  const mockUsers = [
    { id: 1, name: 'User One' },
    { id: 2, name: 'User Two' },
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays loading state', () => {
    useFetch.mockReturnValue({
      data: [],
      status: 'loading',
      error: null,
    })

    render(<UsersList user={null} setUser={mockSetUser} />)

    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument()
    expect(screen.getByText('Spinner')).toBeInTheDocument()
  })

  it('displays error state', () => {
    const mockError = new Error('Failed to fetch users')
    useFetch.mockReturnValue({
      data: [],
      status: 'error',
      error: mockError,
    })

    render(<UsersList user={null} setUser={mockSetUser} />)

    expect(screen.getByText(/Failed to fetch users/i)).toBeInTheDocument()
  })

  it('displays users list', () => {
    useFetch.mockReturnValue({
      data: mockUsers,
      status: 'success',
      error: null,
    })

    render(<UsersList user={null} setUser={mockSetUser} />)

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument()
    })
  })

  it('highlights selected user', () => {
    useFetch.mockReturnValue({
      data: mockUsers,
      status: 'success',
      error: null,
    })

    render(<UsersList user={mockUsers[0]} setUser={mockSetUser} />)

    expect(screen.getByText(mockUsers[0].name).closest('li')).toHaveClass(
      'selected',
    )
  })

  it('calls setUser on user click', () => {
    useFetch.mockReturnValue({
      data: mockUsers,
      status: 'success',
      error: null,
    })

    render(<UsersList user={null} setUser={mockSetUser} />)

    const userButton = screen.getByText(mockUsers[0].name)
    fireEvent.click(userButton)

    expect(mockSetUser).toHaveBeenCalledWith(mockUsers[0])
  })
})
