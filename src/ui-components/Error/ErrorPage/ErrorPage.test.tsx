import React from 'react'
import { fireEvent, render, screen } from 'src/test/test-utils'

import { ErrorPage } from './index'

describe('ErrorPage', () => {
  test('should render & click detail button', () => {
    render(<ErrorPage error={new Error('test error')} resetErrorBoundary={jest.fn()} />)

    const buttonElement = screen.getByText(/Something went wrong/i)
    const detailButton = screen.getByText(/Detail/i)
    expect(buttonElement).toBeInTheDocument()

    fireEvent.click(detailButton)

    const detailScreen = screen.getByText(/Error: test error/i)
    expect(detailScreen).toBeInTheDocument()
  })
})
