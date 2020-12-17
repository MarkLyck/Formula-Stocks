import React, { FC, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from 'react-countup'
import { PieChart } from 'react-minimal-pie-chart'
import styled from '@emotion/styled'
import { cardStyle } from '~/ui-components'
import { getAIScoreColor, getAIScoreType } from '~/common/utils/reportUtils'
import theme from '~/lib/theme'

const Wrapper = styled.div`
  position: relative;
  width: ${(props: any) => props.width}px;
  padding: 16px 16px 0 16px;
  margin-bottom: -42px;

  .gauge-chart {
    path {
      opacity: 0.2;
    }
    path:nth-of-type(${(props: any) => props.activeIndex}) {
      opacity: 1;
    }
  }
`

const IndicatorWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`

const ScoreContainer = styled.div`
  ${cardStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: calc(100% - 120px);
  height: calc(100% - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate(-50%, -50%);
`

const Value = styled.p`
  font-size: 40px;
  font-weight: bold;
`

const ScoreType = styled.p`
  color: ${(props) => props.color};
  font-size: 1rem;
  font-weight: 500;
  margin-top: -8px;
  text-transform: uppercase;
`

export interface ChartPropsType {
  value: number
  startAngle?: number
  lengthAngle?: number
  lineWidth?: number
  paddingAngle?: number
  width?: number
}

const Gauge: FC<ChartPropsType> = ({
  value,
  startAngle = -210,
  lengthAngle = 240,
  lineWidth = 8,
  paddingAngle = 4,
  width = 280,
}: ChartPropsType) => {
  const { countUp, update } = useCountUp({
    end: value,
    formattingFn: (value) => `${value > 0 ? '+' : ''}${value}`,
  })

  const center = width / 2
  const RADIUS = width / 2 - 20

  useEffect(() => update(value), [value])

  const degreesToRadians = (angle: number) => {
    return angle * (Math.PI / 180)
  }

  const dataPercentage = (value: number) => {
    return value / 200
  }

  const calculateMarkerCoords = (value: number, angleOffset: number) => {
    const angle = (dataPercentage(value) * 480) / 2 + angleOffset
    const radians = degreesToRadians(angle)

    const textCoords = {
      x: RADIUS * Math.cos(radians) + center,
      y: RADIUS * Math.sin(radians) + center,
    }

    return textCoords
  }

  const markerCoords = calculateMarkerCoords(value, -90)

  let activeIndex = 1
  if (value >= -20 && value < 20) {
    activeIndex = 2
  } else if (value >= 20 && value < 50) {
    activeIndex = 3
  } else if (value >= 50 && value < 75) {
    activeIndex = 4
  } else if (value >= 75) {
    activeIndex = 5
  }

  return (
    // @ts-ignore
    <Wrapper width={width} activeIndex={activeIndex}>
      <IndicatorWrapper data-chromatic="ignore">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <svg width={`${width}px`} height={`${width}px`} viewBox={`0 0 ${width + 0} ${width + 0}`}>
            <circle
              className="average"
              cx={markerCoords.x}
              cy={markerCoords.y}
              r="12"
              fill="white"
              stroke={getAIScoreColor(value)}
              strokeWidth="3"
            />
          </svg>
        </motion.div>
      </IndicatorWrapper>
      <PieChart
        className="gauge-chart"
        data={[
          {
            title: 'Very bad',
            value: 45,
            color: theme.palette.scale.worst,
          },
          {
            title: 'Bad',
            value: 20,
            color: theme.palette.scale.bad,
          },
          {
            title: 'Okay',
            value: 12.5,
            color: theme.palette.scale.average,
          },
          {
            title: 'Good',
            value: 12.5,
            color: theme.palette.scale.good,
          },
          {
            title: 'Excellent',
            value: 12.5,
            color: theme.palette.scale.perfect,
          },
        ]}
        lineWidth={lineWidth}
        paddingAngle={paddingAngle}
        startAngle={startAngle}
        lengthAngle={lengthAngle}
        animate
      />
      <ScoreContainer>
        <Value>{countUp}</Value>
        <ScoreType color={getAIScoreColor(value)} data-chromatic="ignore">
          {getAIScoreType(value)}
        </ScoreType>
      </ScoreContainer>
    </Wrapper>
  )
}

export default Gauge
