import React from 'react'
import { useQuery } from '@apollo/client'
import { Divider } from 'antd'
import styled from '@emotion/styled'
import { Card, GenericLoading, Empty } from '~/ui-components'
import { capitalize } from '~/common/utils/helpers'
import { STOCK_ABOUT_QUERY } from '~/common/queries'
import { numberFormatter } from '~/common/utils/formatters'
// import FSApolloClient from '~/common/FSApolloClient'

const Info = styled(Card)`
  grid-area: info;
  flex-direction: column;
  margin-bottom: 20px;
`

const Title = styled.h3`
  color: ${(props: any) => props.theme.colors.title};
  font-weight: bold;
  font-size: 1rem;
`

const Ticker = styled.h3`
  margin-bottom: 16px;
  font-size: 0.8rem;
  color: ${(props: any) => props.theme.colors.text};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 16px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const GridItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${(props: any) => props.theme.colors.dbBackground};
  padding: 12px;
  border-radius: 4px;
`

const ItemTitle = styled(Title)`
  font-size: 0.9rem;
  font-weight: 500;
`

const Logo = styled.div`
  background-color: #f9f9f9;
  border-radius: 4px;
  background-image: url(${(props: any) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 48px;
  width: 48px;
  margin-right: 12px;
`

const Header = styled.div`
  display: flex;
`

const About = ({ ticker }: { ticker: string }) => {
  const { loading, error, data } = useQuery(STOCK_ABOUT_QUERY, {
    variables: { ticker },
    // client: FSApolloClient,
  })

  if (loading) return <GenericLoading />
  if (error || !data) {
    return <Empty label={`Info not available for ${ticker}`} />
  }

  const { info, logo } = data.stock

  const items = ['exchange', 'CEO', 'employees', 'sector', 'industry']

  const link = info.website ? info.website.replace('https://', '').replace('http://', '') : ''

  return (
    <Info>
      <Header>
        {/* @ts-ignore */}
        <Logo src={logo} />
        <div>
          <Title>{info.companyName}</Title>
          <Ticker>{info.symbol}</Ticker>
        </div>
      </Header>

      <p>{info.description}</p>
      <Divider />
      <Grid>
        {info.website ? (
          <GridItem>
            <ItemTitle>Website</ItemTitle>
            <a href={info.website} target="_blank">
              {link}
            </a>
          </GridItem>
        ) : null}

        {items.map((item) => {
          if (!info[item]) return null
          const value = !isNaN(Number(info[item])) ? numberFormatter.format(info[item]) : info[item]

          return (
            <GridItem key={item}>
              <ItemTitle>{capitalize(item)}</ItemTitle>
              <p>{value}</p>
            </GridItem>
          )
        })}
      </Grid>
    </Info>
  )
}

export default About
