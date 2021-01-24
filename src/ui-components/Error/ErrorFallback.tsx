import React from 'react'
import { Button, Typography } from 'antd'

const { Text } = Typography

const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div role="alert">
    <Text>Something went wrong:</Text>
    <pre>{error.message}</pre>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </div>
)

export default ErrorFallback
