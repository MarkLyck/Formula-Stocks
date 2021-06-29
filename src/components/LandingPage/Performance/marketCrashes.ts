import dayjs from 'dayjs'

const MARKET_CRASHES = [
  {
    label: '1973-1974 Crash',
    date: '09-31-1974',
    offsetY: -7,
    lineHeight: 15,
  },
  {
    label: 'Black Monday',
    date: '10-31-1987',
    offsetY: -2,
    lineHeight: 10,
  },
  {
    label: '1990s Recession',
    date: '10-31-1990',
  },
  {
    label: 'Dot-Com Bubble',
    date: '06-30-2000',
    offsetY: 12,
  },
  {
    label: 'Financial Crisis',
    date: '02-28-2009',
  },
  {
    label: 'Stock market sell-off',
    date: '01-31-2016',
  },
  {
    label: 'Covid-19',
    date: '03-31-2020',
  },
]

export const markterCrashAnnotations = MARKET_CRASHES.map((crash) => ({
  type: 'dataMarker',
  position: (xScale: any, yScale: any) => {
    const dates = xScale.values
    const values = yScale.value.values
    let valueIndex = 0

    dates.forEach((date: any, i: number) => {
      if (dayjs(date).format('MM-DD-YYYY') === crash.date) {
        valueIndex = i
      }
    })

    const valueAtDate = values[valueIndex]
    return [crash.date, valueAtDate]
  },
  offsetY: crash.offsetY || 15,
  text: {
    content: crash.label,
    style: { textAlign: 'right' },
  },
  point: false,
  line: { length: crash.lineHeight || 40 },
}))
