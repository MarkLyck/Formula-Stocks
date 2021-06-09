export const calculateGrowthRate = (values: number[]) => {
  const years = values.length
  const startValue = values[0]
  const endValue = values[values.length - 1]
  let currentValue = startValue

  if (currentValue < 0) return null
  if (currentValue === 0) return 0

  let doubles = 0

  while (currentValue * 2 <= endValue) {
    currentValue = currentValue * 2
    doubles++
  }

  const remainder = endValue / currentValue - 1

  if (doubles + remainder === 0) return null

  const yearsToDouble = years / (doubles + remainder)

  if (yearsToDouble === 0) return null

  // 72 is the rule of 72.
  // this involves some complicated mathmaetics and logarithm
  // and a deep understanding of compounding growth.
  const growthRate = 72 / yearsToDouble

  return growthRate
}

export const calculateGrowthRateByYear = (values: number[]) => {
  // @ts-ignore
  const growthRate1Year = calculateGrowthRate(values.slice(values.length - 2))
  const growthRate3Years = calculateGrowthRate(values.slice(values.length - 4))
  const growthRate5Years = calculateGrowthRate(values.slice(values.length - 6))
  const growthRate9Years = calculateGrowthRate(values.slice(values.length - 10))

  const growthRates = [
    {
      years: 9,
      growthRate: growthRate9Years,
    },
    {
      years: 5,
      growthRate: growthRate5Years,
    },
    {
      years: 3,
      growthRate: growthRate3Years,
    },
    {
      years: 1,
      growthRate: growthRate1Year,
    },
  ]

  return {
    growthRates,
    growthRate1Year,
    growthRate3Years,
    growthRate5Years,
    growthRate9Years,
  }
}
