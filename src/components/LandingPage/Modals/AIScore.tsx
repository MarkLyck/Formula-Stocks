import React from 'react'
import styled from '@emotion/styled'
import { Modal, Space, List, Typography } from 'antd'
import { AIScoreChart } from 'src/ui-components'

const { Text, Title, Paragraph } = Typography

const StyledSpace = styled(Space)`
  width: 100%;
`

const StyledList = styled(List)`
  border-radius: 8px;
  box-shadow: 0px 4px 14px 0px rgba(111, 120, 156, 0.08);
`

interface AIScoreModalProps {
  isVisible: boolean
  onClose: () => any
}

const AIScoreModal = ({ isVisible, onClose }: AIScoreModalProps) => (
  <Modal title="AI Score" visible={isVisible} onOk={onClose} onCancel={onClose} footer={null} width={1000}>
    <StyledSpace direction="vertical" size="middle">
      <Title level={5}>“Everything should be made as simple as possible, but no simpler.” -Albert Einstein.</Title>
      <Paragraph>
        Selecting stocks can be complicated and time consuming. AI scores are about making it simple & easy. Think of an
        AI score as a rating on a stock, of its overall attractiveness to you as an investor. The underlying businesses
        are analyzed using artificial intelligence and quantitative analysis.
      </Paragraph>
      <Paragraph>
        The AI score itself is a number between -100 and 100. You will see negative numbers depicted as red, small
        numbers as white, and positive numbers as green.
      </Paragraph>
      <Paragraph>You will want to buy green, underweight white, and avoid red.</Paragraph>
      <StyledList
        bordered
        dataSource={[
          'If you had owned 100 random stocks for 50 years, historical experience indicates an average return of 6-7% p.a.',
          'If you had owned 100 stocks with AI-scores of between -20 and -10, you would historically have achieved the same.',
          'If you had owned 100 stocks with AI-scores between 60 and 70, you would have achieved approx. 20% p.a.',
        ]}
        renderItem={(item: any) => (
          <List.Item>
            <Text>{item}</Text>
          </List.Item>
        )}
      />
      <Paragraph>
        In our study, we have taken all stocks, calculated their AI scores, and placed them in buckets, so that all AI
        scores between -100 and -80, goes into bucket 0, and all with -80 to -60 scores goes into bucket 1, etc. Then we
        have measured the historical investment performance of each of these buckets, through 50 years to quantify the
        performance of stocks with a given AI score.
      </Paragraph>
      <Paragraph>
        This interactive graph below will when you move the pointer across the graph, highlight which returns have been
        associated with which AI score. You will notice an extremely strong correlation between the AI score and the
        resulting real world performance later achieved. This is an clear indication that AI scores are an extremely
        efficient method with which to rate stocks attractiveness. Stocks with higher AI scores consistently outperforms
        stocks with lower AI scores across the spectrum.
      </Paragraph>
      <AIScoreChart />
      <Paragraph>
        In order to likely achieve returns not too unlike such historical returns, use at least 20 or 30 stocks, with
        average holding periods of several years.
      </Paragraph>
      <Paragraph>
        Associated with a higher AI score you would find the underlying businesses more often than not have
        characteristics such as these:
      </Paragraph>
      <Paragraph>
        Strong value creation, better growth prospects, inexpensive to purchase, financially strong, better managed,
        better margin of safety, a more shareholder friendly management, a cleaner balance sheet, few or no indications
        of fraudulent accounting, a better business model, etc. This is but a few of over 1.000 things analyzed in the
        construction of an AI Score. Based on proprietary technology available nowhere else.
      </Paragraph>
      <Paragraph>
        If you click on an AI score, you will see more detailed information. This detail is not neccesary to review. The
        single most important piece of information is the Ai score itself. It folds more than 1.000 considerations into
        one single powerful number.
      </Paragraph>
      <Paragraph>
        AI scores are not buy recommendations as such, rather ratings. But you could use them simply as buy indications.
        You would then buy green, and sell once the score drops significantly, or when 3.5 years have passed, whichever
        comes first.
      </Paragraph>
      <Paragraph></Paragraph>
      <StyledList
        header={
          <Title level={5} style={{ marginBottom: 0 }}>
            A few of the ways in which AI scores can be used:
          </Title>
        }
        bordered
        dataSource={[
          'As an investment system in its own right.',
          'In conjunction with Formula Stocks trades.',
          'To validate your own investment ideas.',
          'In conjunction with other investment approaches.',
          'As a part of your own due dilligence process.',
          'As a value or growth investors toolbox to screen for investment opportunities',
          'As a quantitative stock investment system buying for instance all stocks with a score > X',
        ]}
        renderItem={(item: any) => (
          <List.Item>
            <Text>{item}</Text>
          </List.Item>
        )}
      />
    </StyledSpace>
  </Modal>
)

export default AIScoreModal
