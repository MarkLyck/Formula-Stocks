export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const currencyRoundedFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
})

export const numberFormatter = new Intl.NumberFormat('en-US')

export const decimalNumberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
})
