import React from 'react'
import { Modal, Card } from 'antd'
import { useQuery } from '@apollo/client'
import { TRADE_HISTORY } from 'src/common/queries'
import { ScatterChart } from 'src/ui-components/Charts'

interface PastTradesModalProps {
  isVisible: boolean
  onClose: () => any
}

const PastTradesModal = ({ isVisible, onClose }: PastTradesModalProps) => {
  const { data, loading } = useQuery(TRADE_HISTORY)
  const trades = data?.tradeHistoriesList?.items || []
  console.log('🔈 ~ trades', trades)

  // const chartData = trades.map((trade: any) => ({ days: trade.daysHeld, value: trade.percentIncrease }))

  return (
    <Modal title="Historical trades" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={1200}>
      <Card title="Scatter plot of all historical trades">
        <ScatterChart data={trades} loading={loading} />
      </Card>
    </Modal>
  )
}

export default PastTradesModal
