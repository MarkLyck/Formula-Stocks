import React from 'react'
import { Row, Col } from 'antd'
import { PortfolioChart, DashboardHeader } from 'src/ui-components'
import Holdings from './Holdings'
import Allocation from './Allocation'

const GUTTER_SIZE = 24

const Portfolio = () => (
  <>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <DashboardHeader />
      </Col>
    </Row>
    <Row gutter={[GUTTER_SIZE, GUTTER_SIZE]} style={{ marginBottom: GUTTER_SIZE }}>
      <Col span={24}>
        <PortfolioChart />
      </Col>
    </Row>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <Holdings />
      </Col>
    </Row>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <Allocation />
      </Col>
    </Row>
  </>
)

export default Portfolio
