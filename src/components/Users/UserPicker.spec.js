/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserPicker from './UserPicker'

// Mocking the useUser hook
jest.mock('./UserContext', () => ({
  useUser: jest.fn(() => [null, jest.fn()]),
}))

// Mocking the useFetch hook
jest.mock('../../utils/useFetch', () =>
  jest.fn(() => ({ data: [], status: 'loading' })),
)

describe('UserPicker', () => {
  it('renders loading spinner initially', async () => {
    const { getByTestId } = render(<UserPicker />)
    expect(getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders error message if fetch fails', async () => {
    jest.mock('../../utils/useFetch', () =>
      jest.fn(() => ({ data: [], status: 'error' })),
    )
    const { getByText } = render(<UserPicker />)
    expect(getByText('Error!')).toBeInTheDocument()
  })

  it('renders user picker after loading', async () => {
    jest.mock('../../utils/useFetch', () =>
      jest.fn(() => ({ data: [{ id: 1, name: 'John' }], status: 'loaded' })),
    )
    const { getByTestId } = render(<UserPicker />)
    expect(getByTestId('user-picker')).toBeInTheDocument()
  })

  it('updates selected user on select change', async () => {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]
    jest.mock('../../utils/useFetch', () =>
      jest.fn(() => ({ data: users, status: 'loaded' })),
    )
    const { getByTestId } = render(<UserPicker />)
    const selectElement = getByTestId('user-picker')

    fireEvent.change(selectElement, { target: { value: '2' } })
    expect(selectElement.value).toBe('2')
  })
})
