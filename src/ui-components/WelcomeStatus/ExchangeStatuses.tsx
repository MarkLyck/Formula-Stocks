import React from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { Space } from 'antd'

const ExchangeContainer = styled.div`
  padding: 8px 16px;
  background: white;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 4px 14px 0 rgb(111 120 156 / 8%);
  transition: all 0.2s;

  &:hover {
    transform: scale(1.025);
  }
`

const Exchange = styled.img`
  height: 20px;
  margin-right: 16px;
`

const ExchangeTag = styled.span`
  background: ${(p: any) => p.theme.palette[p.open ? 'success' : 'danger'][500]};
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;

  @media (max-width: 940px) {s
    margin-left: 8px;
    font-size: 0.7rem;
  }
`

const USHolidays = {
  '2021': {
    '2021-01-01': 'New Years Day',
    '2021-01-18': 'Martin Luther King, Jr. Day',
    '2021-02-15': "Washington's Birthday",
    '2021-04-02': 'Good Friday',
    '2021-05-31': 'Memorial Day',
    '2021-07-05': 'Independence Day',
    '2021-09-06': 'Labor Day',
    '2021-11-25': 'Thanksgiving Day',
    '2021-12-24': 'Christmas',
  },
  '2022': {
    '2022-01-01': 'New Years Day',
    '2022-01-17': 'Martin Luther King, Jr. Day',
    '2022-02-21': "Washington's Birthday",
    '2022-04-15': 'Good Friday',
    '2022-05-30': 'Memorial Day',
    '2022-07-04': 'Independence Day',
    '2022-09-05': 'Labor Day',
    '2022-11-24': 'Thanksgiving Day',
    '2022-12-26': 'Christmas',
  },
}

const CanadaHolidays = {
  '2021': {
    '2021-01-01': 'New Years Day',
    '2021-02-15': 'Family Day',
    '2021-04-02': 'Good Friday',
    '2021-05-24': 'Victoria Day',
    '2021-07-01': 'Canada Day',
    '2021-08-02': 'Civic Holiday',
    '2021-09-06': 'Labour Day',
    '2021-10-11': 'Thanksgiving Day',
    '2021-12-27': 'Christmas',
    '2021-12-28': 'Boxing day',
  },
  '2022': {
    '2021-01-03': 'New Years Day',
    '2021-02-21': 'Family Day',
    '2021-04-15': 'Good Friday',
    '2021-05-23': 'Victoria Day',
    '2021-07-01': 'Canada Day',
    '2021-08-01': 'Civic Holiday',
    '2021-09-05': 'Labour Day',
    '2021-10-10': 'Thanksgiving Day',
    '2021-12-26': 'Christmas',
    '2021-12-27': 'Boxing day',
  },
}

const ExchangeStatuses = () => {
  let NYSEIsOpen = false
  let NASDAQIsOpen = false
  let TSXIsOpen = false
  //   @ts-ignore
  const timeInNewYork = dayjs().tz('America/New_York')
  const timeInNewYorkHour = timeInNewYork.hour()
  const timeInNewYorkMinute = timeInNewYork.minute()

  const timeInToronto = dayjs().tz('America/Toronto')
  const timeInTorontoHour = timeInNewYork.hour()
  const timeInTorontoMinute = timeInNewYork.minute()

  // NYSE and NASDAQ
  if (
    timeInNewYorkHour >= 9 &&
    timeInNewYorkHour < 16 &&
    // @ts-ignore
    !USHolidays[timeInNewYork.year()][timeInNewYork.format('YYYY-MM-DD')]
  ) {
    if (timeInNewYorkHour === 9) {
      if (timeInNewYorkMinute >= 30) {
        NYSEIsOpen = true
        NASDAQIsOpen = true
      }
    } else {
      NYSEIsOpen = true
      NASDAQIsOpen = true
    }
  }

  // TORONTO
  if (
    timeInTorontoHour >= 9 &&
    timeInTorontoHour < 16 &&
    // @ts-ignore
    !CanadaHolidays[timeInToronto.year()][timeInToronto.format('YYYY-MM-DD')]
  ) {
    if (timeInTorontoHour === 9) {
      if (timeInTorontoMinute >= 30) {
        TSXIsOpen = true
      }
    } else {
      TSXIsOpen = true
    }
  }

  return (
    <Space>
      <ExchangeContainer>
        <Space>
          <Exchange src="/logos/exchanges/nyse.svg" />
          {/* @ts-ignore */}
          <ExchangeTag open={NYSEIsOpen}>{NYSEIsOpen ? 'open' : 'closed'}</ExchangeTag>
        </Space>
      </ExchangeContainer>
      <ExchangeContainer>
        <Space>
          <Exchange src="/logos/exchanges/nasdaq.svg" />
          {/* @ts-ignore */}
          <ExchangeTag open={NASDAQIsOpen}>{NASDAQIsOpen ? 'open' : 'closed'}</ExchangeTag>
        </Space>
      </ExchangeContainer>
      <ExchangeContainer>
        <Space>
          <Exchange src="/logos/exchanges/tsx.svg" />
          {/* @ts-ignore */}
          <ExchangeTag open={TSXIsOpen}>{TSXIsOpen ? 'open' : 'closed'}</ExchangeTag>
        </Space>
      </ExchangeContainer>
    </Space>
  )
}

export default ExchangeStatuses
