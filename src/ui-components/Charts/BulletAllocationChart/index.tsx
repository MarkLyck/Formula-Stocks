import styled from '@emotion/styled'
import { Tooltip, Space, Typography, Spin } from 'antd'

const { Title } = Typography

const Container = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
`

const AllocationBlock = styled.div`
  width: ${(p: { width: number }) => p.width}%;
  height: 100%;
  background: ${(p: any) => p.theme.palette[p.title === 'CASH' ? 'success' : 'primary'][500]};
  border-right: 1px solid ${(p) => p.theme.palette.primary[100]};

  &:hover {
    background: ${(p: any) => p.theme.palette[p.title === 'CASH' ? 'success' : 'primary'][600]};
  }
`

const BulletAllocationChart = ({ data, isLoading }: any) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={4}>Portfolio allocation</Title>
      <Container>
        {isLoading && <Spin />}
        {data.map((block: { value: number; title: string }) => (
          <Tooltip
            key={block.title}
            title={() => (
              <>
                {block.title}: <b>{block.value.toFixed(2)}%</b>
              </>
            )}
          >
            <AllocationBlock title={block.title} width={block.value} />
          </Tooltip>
        ))}
      </Container>
    </Space>
  )
}

export default BulletAllocationChart
