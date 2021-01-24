import React from 'react'
import { Row, Col } from 'antd'
import { PortfolioChart, WelcomeStatus, Card } from '~/ui-components'

const GUTTER_SIZE = 24

const Portfolio = () => (
  <div>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <WelcomeStatus />
      </Col>
    </Row>
    <Row gutter={[GUTTER_SIZE, GUTTER_SIZE]}>
      <Col span={18}>
        <PortfolioChart />
      </Col>
      <Col span={6}>
        <Card style={{ height: '100%' }}>latest sell signals</Card>
      </Col>
    </Row>
    <Row gutter={[GUTTER_SIZE, GUTTER_SIZE]}>
      <Col span={24}>
        <Card style={{ height: '800px' }}>holdings</Card>
      </Col>
    </Row>
  </div>
)

export default Portfolio
