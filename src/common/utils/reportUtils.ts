import theme from 'src/lib/theme'

export const getAIScoreColor = (value: number) => {
  // if (score < -75) return 'Very bad'
  // if (score < -25) return 'Bad'
  // if (score < -10) return 'Below average'
  // if (score < 10) return 'Average'
  // if (score < 25) return 'Above average'
  // if (score < 50) return 'Good'
  // if (score < 80) return 'Great'
  // if (score <= 100) return 'Excellent'

  if (value < -20) {
    return theme.palette.danger[600]
  }

  if (value < 20) {
    return theme.palette.warning[600]
  }

  if (value < 50) {
    return theme.palette.primary[600]
  }

  return theme.palette.success[600]
}

export const getAIScoreType = (value: number) => {
  if (value < -50) {
    return 'very bad'
  }
  if (value < -20) {
    return 'bad'
  }
  if (value < 20) {
    return 'average'
  }
  if (value < 50) {
    return 'good'
  }
  if (value < 75) {
    return 'very good'
  }
  return 'excellent'
}
