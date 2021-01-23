import React from 'react'
import { StatisticsModal, AIScoreModal, PerformanceGuaranteeModal, ReturnsCalculatorModal } from './index'

export default {
  title: 'landing_page/modals',
  parameters: {
    layout: 'centered'
  }
}

export const statistics = () => (
  <StatisticsModal isVisible statistics={{
    "gainToPainRatio": 1.5685,
    "winLossRatio": 91.6371367824,
    "totalReturn": 5573102.66,
    "sortinoRatio": 2.101927,
    "sharpeRatio": 1.2,
    "roundtripTradesPerYear": 82,
    "positionsSoldWithProfit": 1293,
    "positionsSoldWithLoss": 118,
    "maxDrawdown45Years": 53.446918,
    "maxDrawdown36Months": 23.174836,
    "iRRGeometricMean": 31.03,
    "iRRArithmeticMean": 52.61,
    "formulasUsed": 4,
    "cAGR": 23.91,
    "cALMARRatio3Year": 2.6905,
    "averageNumberOfPositionsInPortfolio": 177,
    "averageLossPerPosition": 16.74,
    "averageHoldingPeriod": 826,
    "averageGainPerPosition": 74.99
  }} onClose={() => { }} />
)

export const ai_score = () => (
  <AIScoreModal isVisible onClose={() => { }} />
)

export const performance_guarantee = () => (
  <PerformanceGuaranteeModal isVisible onClose={() => { }} />
)

export const returns_calculator = () => (
  <ReturnsCalculatorModal isVisible onClose={() => { }} />
)