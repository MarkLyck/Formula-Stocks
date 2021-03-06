import { sixMonthsPricesMock } from './prices/sixMonthsPrices'

const quoteMock = {
  avgTotalVolume: 840302,
  calculationPrice: 'iexlasttrade',
  change: -0.015,
  changePercent: -0.00484,
  close: null,
  closeSource: 'official',
  closeTime: null,
  companyName: 'Alliance Resource Partners LP',
  delayedPrice: null,
  delayedPriceTime: null,
  extendedChange: null,
  extendedChangePercent: null,
  extendedPrice: null,
  extendedPriceTime: null,
  high: 3.155,
  highSource: '15 minute delayed price',
  highTime: 1590177600485,
  iexAskPrice: 0,
  iexAskSize: 0,
  iexBidPrice: 0,
  iexBidSize: 0,
  iexClose: 3.085,
  iexCloseTime: 1590177383462,
  iexLastUpdated: 1590177383462,
  iexMarketPercent: 0.007173530168404805,
  iexOpen: null,
  iexOpenTime: null,
  iexRealtimePrice: 3.085,
  iexRealtimeSize: 100,
  iexVolume: 2900,
  isUSMarketOpen: false,
  lastTradeTime: 1590177600485,
  latestPrice: 3.085,
  latestSource: 'IEX Last Trade',
  latestTime: 'May 22, 2020',
  latestUpdate: 1590177383462,
  latestVolume: 404264,
  low: 3.02,
  lowSource: '15 minute delayed price',
  lowTime: 1590156365877,
  marketCap: 392396575,
  oddLotDelayedPrice: null,
  oddLotDelayedPriceTime: null,
  open: null,
  openSource: 'official',
  openTime: null,
  peRatio: -15.32,
  previousClose: 3.1,
  previousVolume: 518805,
  primaryExchange: 'NASDAQ',
  symbol: 'TST',
  volume: 404264,
  week52High: 18.41,
  week52Low: 2.7,
  ytdChange: -0.7366739999999999,
}

export const stockMock = {
  date: '2020-05-22T00:00:00.000Z',
  latestPrice: 3.07,
  logo: 'https://g.foolcdn.com/art/companylogos/square/arlp.png',
  ticker: 'TST',
  quote: quoteMock,
  sixMonthsPrices: sixMonthsPricesMock,
}
