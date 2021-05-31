import styled from '@emotion/styled'
import { Card } from 'antd'

export const UpdateCardDetailsContainer = styled.div`
  margin: 0 auto 16px;
  width: 100%;
  box-sizing: border-box;

  .title {
    padding-left: 16px;
    font-size: 1.2rem;
    font-weight: 100;
  }
`

export const UpdateDetailsPaper = styled(Card)`
  flex-direction: column;
  padding: 16px;
`

export const FieldContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;

  svg {
    color: #737373;
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }

  .stripe-input {
    padding-left: 40px;
    &:hover {
      border-color: hsl(0, 0%, 70%);
      cursor: text;
    }
  }

  &:nth-of-type(2) {
    margin-left: 16px;
  }
`
