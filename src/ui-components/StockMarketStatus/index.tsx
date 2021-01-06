import React from 'react'
import styled from 'styled'
import { opacify } from 'polished'
import { Tooltip } from 'antd'
import { format, isBefore, isAfter, isSaturday, isSunday } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import stockMarketHolidays from '~/common/info/stockMarketHolidays'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const OpenIndicator = styled.div`
  height: 16px;
  width: 16px;
  background: ${(props: any) =>
    opacify(-0.4, props.marketIsOpen ? props.theme.colors.scale.perfect : props.theme.colors.gray)};

  border: 2px solid;
  border-color: ${(props: any) => (props.marketIsOpen ? props.theme.colors.scale.perfect : 'gray')};
  border-radius: 50%;
  margin-right: 8px;
`

const MarketText = styled.h4`
  font-weight: 500;
`

const now = new Date()
const holidayList = Object.values(stockMarketHolidays[now.getFullYear()])
const isHoliday = holidayList.includes(format(now, 'yyyy-MM-dd'))

const StockMarketStatus = () => {
  const timeZone = 'America/New_York'
  const nowInNewYork = utcToZonedTime(new Date(), timeZone)

  let openTime = utcToZonedTime(new Date(), timeZone)
  openTime.setHours(9)
  openTime.setMinutes(30)

  let closeTime = utcToZonedTime(new Date(), timeZone)
  closeTime.setHours(16)
  closeTime.setMinutes(0)

  let marketIsOpen = false
  if (
    !isHoliday && // it's not a holiday
    !isSaturday(nowInNewYork) && // it's not weekend
    !isSunday(nowInNewYork) &&
    isAfter(nowInNewYork, openTime) && // it's after open hours
    isBefore(nowInNewYork, closeTime) // it's before closing hours
  ) {
    marketIsOpen = true
  }

  return (
    <Tooltip
      title={`The stock market is ${marketIsOpen ? 'open' : 'closed'}`}
      overlayStyle={{ width: '190px', textAlign: 'center' }}
    >
      <Container>
        {/* @ts-ignore */}
        <OpenIndicator marketIsOpen={marketIsOpen} data-chromatic="ignore" />
        <MarketText>Stock Market</MarketText>
      </Container>
    </Tooltip>
  )
}

export default StockMarketStatus
