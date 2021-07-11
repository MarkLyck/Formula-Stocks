import React from 'react'
import styled from '@emotion/styled'
import { Typography, Card, List } from 'antd'
import ExampleTrade from './ExampleTrade'

import Navbar from '../Navbar'

const { Title, Paragraph } = Typography

const RiskContainer = styled.div`
  background: ${(props) => props.theme.palette.neutral[200]};
  box-sizing: border-box;
  padding-bottom: 32px;
`

const Content = styled(Card)`
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 32px;
  padding-top: 100px;
  margin-bottom: 32px;

  background: white;
`

const TradesContainer = styled.div`
  display: flex;
  width: 100%;

  > div {
    margin-right: 16px;
  }
`

const Author = styled.span`
  font-style: italic;
`

const booksData = [
  { title: 'The intelligent investor', author: 'Benjamin Graham' },
  { title: 'The Superinvestors of Graham-and-Doddsville', author: 'Warren Buffett' },
  { title: 'Security Analysis', author: 'Benjamin Graham' },
  { title: 'Remniscences of a stock operator', author: 'Edwin Lefevre. (Jesse Livermore)' },
  { title: 'Paths to wealth through common stocks', author: 'Philip A. Fisher' },
  { title: 'Margin of safety', author: 'Seth Klarman' },
  { title: 'The black swan', author: 'Nassim Nicholas Taleb' },
  { title: 'Bernard Baruch', author: 'James Grant' },
  { title: 'Morgan', author: 'Jean Sprouse' },
  { title: 'Berkshire Hathaway letters to shareholders 1965-2014', author: 'Max Olson & Warren Buffett' },
  { title: 'Poor Charlies almanac', author: 'Charlie Munger' },
  { title: 'Investing the Templeton way', author: 'Lauren Templeton' },
  { title: 'The snowball: Warren Buffett', author: 'Alice Schroeder' },
  { title: 'Extraordinary popular delusions and the madness of crowds', author: 'Charles Mackay' },
]

const Strategy = () => {
  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      <RiskContainer>
        <Content>
          <Title>Strategy</Title>
          <Paragraph>
            Formula Stocks specializes in buying wonderful businesses at an attractive price. You'd like a business that
            grows, in which the reward is asymmetrically larger than the risk. You want a good business model which is
            profitable, managed by people who act in your interest as a shareholder. A business that is financially
            sound and well funded, deliver honest returns, and offer you a good earnings yield. You get the picture, so
            in the interest of brevity we will omit the last 50 things which you would ideally also like to see in a
            business you invest in.
          </Paragraph>
          <Paragraph>
            Many books have been written about how to invest in great businesses at an attractive price. There are a few
            such titles at the bottom of this page. However you don't need to read or understand them if you have met
            Joe.
          </Paragraph>
          <Paragraph>
            Joe is an artificial intelligence with a diverse personality. He thinks like 25 of the best super investors
            such as Benjamin Graham, Philip Fisher, Warren Buffett, Jesse Livermore, to name a few.
          </Paragraph>
          <Paragraph>
            Investing is all about the future. Artificial intelligence is particular adept at understanding what
            positively affects future investment returns. We spent 14 years training what you might call a neural
            network to think like the worlds best super investors. Why them? Because each of them brought unqiue
            insights to the table. Each understood something better than others, and by understanding all of them, we
            have trained Joe to look at a stock, and immediately tell us how "likable" it is from an investors
            perspective, as seen through many lenses. This is what we call an AI-score. Joe is also capable of
            constantly scanning the entire universe of stocks, looking for the best deals. What would take 60 human
            investors working 8-16 a month to analyze, Joe does in half an hour.
          </Paragraph>
          <Paragraph>
            As human beings we have a lot of biases. Think of them as mental shortcuts our biological brain tends to
            make, in order to process complex data fast. Biases makes our brains fast, but also very imprecise. They
            introduce errors. Joe doesnt have biases, he does not need to approximate og generalize, or jump to
            conclusions based on incomplete knowledge as we do all the time, he calculates precisely, meticously, with
            perfect memory and no limits to complexity. He makes a lot fewer errors than his human analyst counterparts
            prone to biases.
          </Paragraph>
          <Paragraph>
            For that reason Joe can do certain things that a human investor could not accomplish. Not even a super
            investor, and as such Joe advances the field of investing. In order to bring Joes expertise to the highest
            level, we have spent 14 calendar years meticisouly teaching him, the same time a human teenager would
            require in order to learn how the world operates. For the record: Joes world goes no further than investment
            excellence, he has no ego or sense of self.
          </Paragraph>
          <Paragraph>Lets look at an example simplified as much as possible, for brevity.</Paragraph>
          <Paragraph>
            At newyears eve 2009 Formula Stocks bought Apple Inc., a company we had owned on several previous occasions.
            Why?
          </Paragraph>
          <TradesContainer>
            <ExampleTrade date="2009" action="BUY" ticker="AAPL" aiScore={20 / 100} percentReturn={10} />
            <ExampleTrade date="2011" action="SELL" ticker="AAPL" percentReturn={51.2} />
          </TradesContainer>
          <Paragraph>
            It constituted a wonderful business at a very fair price. Joe calculated at the time that Apple could
            provide up to a 51.2% yearly return idealized. Joe also assigned Apple an AI-Score of +20.
          </Paragraph>
          <Paragraph>
            What happened in the years after Joe made that call? Joe made a +111% investment return in the following 13
            months. And then decided to sell, in order to redeploy capital elsewhere.
          </Paragraph>
          <Paragraph>
            Again in 2013 Joe turns to Apple, again eyeing a 51,1% potential return. This time Joe makes a +39.05%
            return before turning his attention elsewhere. Joe assigned Apple an AI-Score of +30.
          </Paragraph>
          <TradesContainer>
            <ExampleTrade date="2013" action="BUY" ticker="AAPL" aiScore={30 / 100} percentReturn={10} />
            <ExampleTrade date="2014" action="SELL" ticker="AAPL" percentReturn={39.05} />
          </TradesContainer>
          <Paragraph>
            Again in 2016 Joe turns to Apple. This time Joe makes a +56.97% return before turning his attention
            elsewhere. Joe assigned Apple an AI-Score of +20.
          </Paragraph>
          <TradesContainer>
            <ExampleTrade date="2016" action="BUY" ticker="AAPL" aiScore={20 / 100} percentReturn={10} />
            <ExampleTrade date="2017" action="SELL" ticker="AAPL" percentReturn={56.97} />
          </TradesContainer>
          <Paragraph>
            Fast forward to 2021. Would Formula Stocks buy Apple Inc. today? No. Joe now calculates, june 2021, that the
            owner of Apple could get a return of 1,62% annualy going forward by the same measure. Unattractive. And
            assigns Apple an AI-score of -33,87
          </Paragraph>
          <Paragraph>
            What is going on? Apple was and still is a wonderful business. It traded then at an attractive price, and
            now it does not. Joe knows exactly what to do.
          </Paragraph>
          <Paragraph>
            More than 200 factors are evaluated. Joe generally wins with 93% of the calls that he make. Get Joe to bat
            for you.
          </Paragraph>
          <Paragraph>
            Joe consists of 37.5 million lines of software code. In his learning process more than 200 books were
            digested, 14 consecutive calendar years spent on learning. A few basic excerpts from the literature list:
          </Paragraph>
          <List
            size="small"
            bordered
            dataSource={booksData}
            renderItem={(item) => (
              <List.Item>
                "{item.title}" by <Author>{item.author}.</Author>
              </List.Item>
            )}
          />
        </Content>
      </RiskContainer>
    </>
  )
}

export default Strategy
