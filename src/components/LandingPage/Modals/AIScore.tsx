import React from 'react'
import styled from '@emotion/styled'
import { Modal, Space } from 'antd'
import { AIScoreChart, AIScoreChartOLD, Paragraph } from '~/ui-components'
import { COMPANY_NAME, BLOG_POSTS } from '~/common/constants'

const StyledSpace = styled(Space)`
  width: 100%;
`

interface AIScoreModalProps {
  isVisible: boolean
  onClose: () => any
}

const AIScoreModal = ({ isVisible, onClose }: AIScoreModalProps) => (
  <Modal title="AI Score" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={1000}>
    <StyledSpace direction="vertical" size="middle">
      <Paragraph>Every algorithm that powers {COMPANY_NAME} is developed using the scientific method.</Paragraph>
      <Paragraph>
        The AI Score is a combination of many algorithms that each attempt to evaluate a business in many different
        ways, assigning a score from -100 to +100 to every stock, where a score of -100 is worst, 0 is "an average
        stock" and +100 is a great value investment.
      </Paragraph>
      <Paragraph>
        Testing our hypothesis the for AI Score is simple. By running an{' '}
        <a href={BLOG_POSTS.BACKTESTING_BIAS} target="_blank">
          unbiased simulation
        </a>{' '}
        investing only in stocks with an AI Score of [-100 to -90], [-90 to -80], [-80 to -70], etc. If the AI Score
        works this should result in a better return and higher win ratios in a somewhat orderly fashion for each
        bracket.
      </Paragraph>
      <AIScoreChart />
      <AIScoreChartOLD />
      <Paragraph>
        The above chart shows this experiment tested over a period of 50 years on +12,000 stocks. You can see if you
        invested solely in stocks with an AI Score between +80 to +90 the likely long-term outcome is a return of ~27%.
        <br />
        <br />
        You can see the win ratio also increases proportionally when invested in stocks with higher AI Scores.
      </Paragraph>
    </StyledSpace>
  </Modal>
)

export default AIScoreModal
