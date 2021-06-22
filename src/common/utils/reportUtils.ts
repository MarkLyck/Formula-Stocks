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

  if (value < -60) {
    return theme.palette.danger[600]
  }

  if (value < 0) {
    return theme.palette.warning[600]
  }

  if (value < 20) {
    return theme.palette.neutral[600]
  }

  if (value < 50) {
    return theme.palette.primary[600]
  }

  return theme.palette.success[600]
}

export const getAIScoreSentiment = (score: number) => {
  if (score < -90) return 'Very bad'
  if (score < -60) return 'Bad'
  if (score < 0) return 'Fair'
  if (score < 20) return 'Average'
  if (score < 30) return 'Above average'
  if (score < 50) return 'Good'
  if (score < 80) return 'Great'
  if (score < 100) return 'Excellent'
  return 'Ideal'
}
