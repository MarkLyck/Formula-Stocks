import styled from '@emotion/styled'
import { cardStyle } from '~/ui-components'

export const Table = styled.table`
  ${cardStyle};
  display: table;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.2),
    0 -6px 16px -6px rgba(0, 0, 0, 0.015);

  @media (max-width: 700px) {
    .sales-price,
    .sales-price-header {
      display: none;
    }
  }
  @media (max-width: 600px) {
    .purchase-price,
    .purchase-price-header {
      display: none;
    }
  }
`

export const TableRow = styled.tr`
  width: 100%;
  border-bottom: 1px solid ${(p: any) => p.theme.palette.basic[500]};
`

export const TableBody = styled.tbody`
  tr:hover {
    background: ${(p: any) => p.theme.palette.basic[200]};
  }

  .percent-return.positive {
    color: ${(p: any) => p.theme.palette.success[500]};
  }
  .percent-return.positive::before {
    content: '+';
  }

  .percent-return.negative {
    color: ${(p: any) => p.theme.palette.danger[500]};
  }
`

export const TableHeadCell = styled.th`
  padding: 20px 24px;
  box-sizing: border-box;
  @media (max-width: 500px) {
    font-size: 0.8rem;
    padding: 16px;
  }
`

export const TableCell = styled.td`
  padding: 20px 24px;
  font-weight: 400;
  box-sizing: border-box;
  color: ${(p: any) => p.theme.palette.basic[500]};

  @media (max-width: 500px) {
    font-size: 0.8rem;
    padding: 16px;
  }
`

export const StockName = styled.span`
  font-weight: 400;

  @media (max-width: 1000px) {
    display: none;
  }
`
