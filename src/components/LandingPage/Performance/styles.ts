import styled from '@emotion/styled'
import { cardStyle } from '~/ui-components'

export const GraphContainer = styled.div`
  position: relative;
  width: calc(100% - 32px);
  margin: 8px 0px 16px;
  height: 480px;
  border-radius: 8px;
  box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;

  .portfolio-legends {
    z-index: 10;
    top: 24px;
  }

  #single-launch-performance-graph,
  #single-backtested-performance-graph {
    width: 100%;
    max-width: calc(100vw - 64px);
    overflow: hidden;
    ${cardStyle};
    padding: 0;
    height: 100%;
    border: none;

    > div:nth-of-type(2) {
      transform: translate(4px, 5px);
    }
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`

export const ChartLoaderContainer = styled.div`
  ${cardStyle};
  height: 480px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
  background: ${p => p.theme.palette.basic[200]};
  
  svg {
    color: ${p => p.theme.palette.primary[500]};
    margin-bottom: 24px;
  }

  p {
    font-weight: 500;
    font-size: 1rem;
  }
`
