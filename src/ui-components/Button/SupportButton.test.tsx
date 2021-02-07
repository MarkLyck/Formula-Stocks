import React from 'react'
import { render, screen } from 'src/test/test-utils'
import { SupportButton } from './SupportButton'

describe('SupportButton', () => {
  test('should render', async () => {
    render(<SupportButton />)

    const copyBtn = screen.getByText(/Contact support/i)
    expect(copyBtn).toBeInTheDocument()
  })
})
