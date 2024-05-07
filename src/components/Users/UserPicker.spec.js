/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import React from 'react'
import App from '../App'
import { render, screen } from '@testing-library/react'
import 'babel-polyfill'

// Mock the spinner component
jest.mock('../UI/Spinner', () => () => (
  <div data-testid="spinner">Mocked Spinner</div>
))

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ]),
  }),
)

describe('UserPicker', () => {
  it('renders spinner when network request is in progress', () => {
    const { getByTestId } = render(<App />)

    expect(screen.queryByText('Loading...')).toBeNull()
    expect(screen.getByText('User 1')).toBeInTheDocument()

    // select a different user
    const selectElement = screen.getByTestId('user-picker')
    userEvent.selectOptions(selectElement, '2')

    expect(screen.getByText('User 2')).toBeInTheDocument()
    //usefetch y getdata
    const spinner = getByTestId('spinner')
    expect(spinner).toBeInTheDocument
  })
})
