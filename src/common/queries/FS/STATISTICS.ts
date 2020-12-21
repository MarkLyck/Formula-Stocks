import { gql } from '@apollo/client'

export const STATISTICS = gql`
    query STATISTICS {
        statisticsList(filter: {plan: {planID: {equals: "entry"}}}) {
        items {
            gainToPainRatio
            winLossRatio
            totalReturn
            sortinoRatio
            sharpeRatio
            roundtripTradesPerYear
            positionsSoldWithProfit
            positionsSoldWithLoss
            maxDrawdown45Years
            maxDrawdown36Months
            iRRGeometricMean
            iRRArithmeticMean
            formulasUsed
            cAGR
            cALMARRatio3Year
            averageNumberOfPositionsInPortfolio
            averageLossPerPosition
            averageHoldingPeriod
            averageGainPerPosition
        }
        }
    }
`

export const STATISTICS_SINCE_LAUNCH = gql`
    query STATISTICS {
        statisticsSinceLaunchesList(filter: {plan: {planID: {equals: "entry"}}}) {
        items {
            totalReturn
          }
        }
    }
`