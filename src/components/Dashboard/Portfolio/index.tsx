import React from 'react'
import { Row, Col } from 'antd'
import { PortfolioChart, WelcomeStatus, Card } from 'src/ui-components'
import Holdings from './Holdings'
import Allocation from './Allocation'

const GUTTER_SIZE = 24

const Portfolio = () => (
  <>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <WelcomeStatus />
      </Col>
    </Row>
    <Row gutter={[GUTTER_SIZE, GUTTER_SIZE]} style={{ marginBottom: GUTTER_SIZE }}>
      <Col span={18}>
        <PortfolioChart />
      </Col>
      <Col span={6}>
        <Card style={{ height: '100%' }}>
          latest sell signals
          <Allocation />
        </Card>
      </Col>
    </Row>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <Holdings />
      </Col>
    </Row>
  </>
)

export default Portfolio
