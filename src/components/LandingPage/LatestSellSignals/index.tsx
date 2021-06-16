import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { maxSiteWidth } from 'src/common/styles'
import { LATEST_SELL_SIGNALS } from 'src/common/queries'
import { ScalingTitle, ScalingSubTitle, GenericLoading, Disclaimer, Tag, StockReturn } from 'src/ui-components'
import { Table, TableBody, TableRow, TableCell, TableHeadCell, StockName } from './styles'

const LatestSellsContainer = styled.div`
  ${maxSiteWidth};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 4rem;

  @media (max-width: 500px) {
    margin-top: 24px;
  }
`

const ReturnTableHeadCell = styled(TableHeadCell)`
  min-width: 140px;
  width: 140px;
`

const ReturnTableCell = styled(TableCell)`
  max-width: 120px;
`

const StyledDisclaimer = styled(Disclaimer)`
  margin: 16px auto 0;
  width: 100%;
  text-align: center;
`

const StockContainer = styled.div`
  display: flex;
  align-items: center;
`

const TagContainer = styled.div`
  width: 90px;
`

const LatestSellSignals = () => {
  const { loading, error, data } = useQuery(LATEST_SELL_SIGNALS)

  const [numberVisible] = useState(10)
  const latestSells = data ? data.latestSellSignalsList.items : []

  return (
    <LatestSellsContainer>
      <ScalingTitle>Latest sell signals</ScalingTitle>
      <ScalingSubTitle>Here's our 10 latest sell signals (updated monthly)</ScalingSubTitle>
      {loading && <GenericLoading />}
      {error && <div>Error loading</div>}
      <Table>
        <thead>
          <TableRow>
            <TableHeadCell>Stock sold</TableHeadCell>
            <ReturnTableHeadCell className="purchase-price-header">Bought at</ReturnTableHeadCell>
            <ReturnTableHeadCell className="sales-price-header">Sold at</ReturnTableHeadCell>
            <ReturnTableHeadCell className="return-header">Return</ReturnTableHeadCell>
          </TableRow>
        </thead>
        <TableBody>
          {latestSells.slice(0, numberVisible).map((sell: any, i: number) => {
            const percentReturn: number = Number((((sell.soldAt - sell.boughtAt) * 100) / sell.boughtAt).toFixed(2))
            return (
              <TableRow key={sell.name + i}>
                <TableCell className="stock-name">
                  <StockContainer>
                    <TagContainer>
                      <Tag>{sell.ticker.replace('_', '.')}</Tag>
                    </TagContainer>
                    <StockName>{sell.name}</StockName>
                  </StockContainer>
                </TableCell>
                <ReturnTableCell className="purchase-price">${sell.boughtAt.toFixed(2)}</ReturnTableCell>
                <ReturnTableCell className="sales-price">${sell.soldAt.toFixed(2)}</ReturnTableCell>
                <ReturnTableCell>
                  <StockReturn percentReturn={percentReturn} />
                </ReturnTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <StyledDisclaimer>*Past results are not necessarily indicative of future returns.</StyledDisclaimer>
    </LatestSellsContainer>
  )
}

export default LatestSellSignals
