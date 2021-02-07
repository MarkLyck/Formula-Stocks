import React from 'react'
import { fireEvent, render, screen } from 'src/test/test-utils'

import { ErrorCard } from './index'

describe('ErrorCard', () => {
  test('should render & click detail button', () => {
    render(<ErrorCard error={new Error('test error')} resetErrorBoundary={jest.fn()} />)

    const buttonElement = screen.getByText(/Retry/i)
    expect(buttonElement).toBeInTheDocument()
  })
})
