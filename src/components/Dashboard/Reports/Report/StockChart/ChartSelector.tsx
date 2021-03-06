import { Radio, Tooltip } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CandleStickIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 14px;
    width: 14px;
  }
`

const ChartSelector = ({ setChartType, chartType }: any) => {
  return (
    <Radio.Group
      onChange={(event: any) => setChartType(event.target.value)}
      defaultValue={chartType}
      style={{ display: 'flex' }}
    >
      <Tooltip title="Line chart">
        <Radio.Button value="line">
          <FontAwesomeIcon icon={['fad', 'chart-line']} />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="Candlestick chart">
        <Radio.Button value="candle-stick">
          {/* @ts-ignore */}
          <CandleStickIcon>
            <svg width="30" height="36" viewBox="0 0 30 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.0376 6.38428H4.60498V2.57666C4.60498 2.21777 4.31396 1.92676 3.95459 1.92676C3.59521 1.92676 3.3042 2.21777 3.3042 2.57666V6.38428H0.871582C0.512207 6.38428 0.221191 6.67529 0.221191 7.03418V21.5615C0.221191 21.9209 0.512207 22.2119 0.871582 22.2119H3.3042V35.2012C3.3042 35.5605 3.59521 35.8516 3.95459 35.8516C4.31396 35.8516 4.60498 35.5605 4.60498 35.2012V22.2119H7.0376C7.39697 22.2119 7.68799 21.9209 7.68799 21.5615V7.03418C7.68799 6.67529 7.39697 6.38428 7.0376 6.38428Z"
                fill="currentColor"
              />
              <path
                d="M17.895 13.6675H15.4624V6.77002C15.4624 6.41113 15.1714 6.12012 14.812 6.12012C14.4526 6.12012 14.1616 6.41113 14.1616 6.77002V13.6675H11.729C11.3696 13.6675 11.0786 13.9585 11.0786 14.3174V24.8379C11.0786 25.1973 11.3696 25.4883 11.729 25.4883H14.1616V31.0635C14.1616 31.4229 14.4526 31.7139 14.812 31.7139C15.1714 31.7139 15.4624 31.4229 15.4624 31.0635V25.4883H17.895C18.2544 25.4883 18.5454 25.1973 18.5454 24.8379V14.3174C18.5454 13.9585 18.2544 13.6675 17.895 13.6675Z"
                fill="currentColor"
              />
              <path
                d="M29.0854 4.53662H26.6528V0.819336C26.6528 0.460449 26.3618 0.169434 26.0024 0.169434C25.6431 0.169434 25.3521 0.460449 25.3521 0.819336V4.53662H22.9194C22.5601 4.53662 22.269 4.82764 22.269 5.18652V25.8076C22.269 26.167 22.5601 26.458 22.9194 26.458H25.3521V33.2764C25.3521 33.6357 25.6431 33.9268 26.0024 33.9268C26.3618 33.9268 26.6528 33.6357 26.6528 33.2764V26.458H29.0854C29.4448 26.458 29.7358 26.167 29.7358 25.8076V5.18652C29.7358 4.82764 29.4448 4.53662 29.0854 4.53662ZM28.4351 25.1572H23.5698V5.83643H28.4351V25.1572Z"
                fill="currentColor"
              />
            </svg>
          </CandleStickIcon>
        </Radio.Button>
      </Tooltip>
    </Radio.Group>
  )
}

export default ChartSelector
