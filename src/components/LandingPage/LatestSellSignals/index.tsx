import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { maxSiteWidth } from 'src/common/styles'
import { LATEST_SELL_SIGNALS } from 'src/common/queries'
import { ScalingTitle, ScalingSubTitle, GenericLoading, Tag, StockReturn, ActionButton } from 'src/ui-components'
import { PastTradesModal } from '../Modals'
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

const StockContainer = styled.div`
  display: flex;
  align-items: center;
`

const TagContainer = styled.div`
  width: 90px;
`

const LatestSellSignals = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { loading, error, data } = useQuery(LATEST_SELL_SIGNALS)

  const [numberVisible] = useState(10)
  const latestSells = data ? data.latestSellSignalsList.items : []

  return (
    <LatestSellsContainer>
      <PastTradesModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
      <ScalingTitle>Latest sell signals</ScalingTitle>
      <ScalingSubTitle style={{ marginBottom: 40 }}>
        Here's our 10 latest sell signals (updated monthly)
      </ScalingSubTitle>
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
      {/* @ts-ignore */}
      <ActionButton onClick={() => setModalVisible(true)} style={{ marginTop: 32 }}>
        <FontAwesomeIcon icon={['fad', 'history']} style={{ marginRight: 8 }} />
        SEE ALL HISTORICAL TRADES
      </ActionButton>
    </LatestSellsContainer>
  )
}

export default LatestSellSignals
