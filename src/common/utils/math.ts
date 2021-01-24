export const calculatePercentIncrease = (startValue: number, endValue: number) => {
  const increase = endValue - startValue
  const percentIncrease = (increase / startValue) * 100

  return percentIncrease
}
