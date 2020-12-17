import React from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { cardStyle, GenericLoading, Empty } from '~/ui-components'
import { STOCK_ARTICLES_QUERY } from '~/common/queries'
// import FSApolloClient from '~/common/FSApolloClient'
import { NotNeededToUseService } from './Stats'

const ArticlesContainer = styled.div``

const Article = styled.a`
  ${cardStyle};
  display: grid;
  grid-template-columns: 120px auto;
  grid-template-rows: auto;
  grid-column-gap: 16px;
  grid-row-gap: 4px;
  grid-template-areas:
    'image headline'
    'image summary'
    'image footer';
  margin-bottom: 16px;

  text-decoration: none;
  color: ${(props: any) => props.theme.palette.text[500]};
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.2);
    text-decoration: none;
    color: ${(props: any) => props.theme.palette.text[500]};

    .news-article-footer {
      color: ${(props: any) => props.theme.palette.primary[500]};
    }
  }
`

const Image = styled.div`
  grid-area: image;
  background-image: url(${(props: any) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 3px;
  border: 1px solid ${(props: any) => props.theme.palette.border};
`

const Headline = styled.h2`
  grid-area: headline;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.2em;
  margin-bottom: 8px;
`
const Summary = styled.p`
  grid-area: summary;
  color: rgba(0, 0, 0, 0.65);

  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 3.6em;
  text-align: justify;
  margin-right: 1em;
  padding-right: 1em;

  &:before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
  }
`
const Footer = styled.p`
  grid-area: footer;
  transition: all 0.2s;
`
const Source = styled.span``
const DateTime = styled.span``

const StockArticles = ({ ticker }: { ticker: string }) => {
  const { loading, error, data } = useQuery(STOCK_ARTICLES_QUERY, {
    variables: { ticker },
    // client: FSApolloClient,
  })
  if (loading) return <GenericLoading />
  if (error || !data || !data.stock.articles.items.length) return <Empty label={`No articles found for ${ticker}`} />

  const articles = data.stock.articles.items

  return (
    <ArticlesContainer>
      <NotNeededToUseService
        title="You don't need to follow the news to use Weekly Stocktip!"
        text="We've provided the latest related articles for those who prefer to do their own research and analysis. Weekly Stocktip does not rely on any news to function."
      />
      {articles.map((article: any) => (
        <Article key={article.headline} href={article.url} target="_blank">
          {/* @ts-ignore */}
          <Image src={article.image} />
          <Headline>{article.headline}</Headline>
          <Summary>{article.summary}</Summary>
          <Footer className="news-article-footer">
            <DateTime>{format(new Date(article.dateTime), 'dd MMM, yyyy')}</DateTime> |{' '}
            <Source>{article.source}</Source>
          </Footer>
        </Article>
      ))}
    </ArticlesContainer>
  )
}

export default StockArticles
