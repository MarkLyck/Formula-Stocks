export const WORK_SPACE_ID = 'ck1y5djt0000201ldey0t1bju'
export const GRAPHQL_ENDPOINT = `https://api.8base.com/${WORK_SPACE_ID}`
export const AUTH_PROFILE_ID = 'ck3689vfo00xk01l5g4we1bp1'

export const STRIPE_API_KEY = 'pk_live_3kRhRm6wqrUJ3ThsaDlf0f8w'
export const PLAN_PREFIX = 'weekly-'
export const PRICE = 50

export const COMPANY_NAME = 'Formula Stocks'

export const WIN_RATIO = 93.67
export const ANNUAL_GROWTH = 34.14
export const AVG_GAIN = 102.37
export const AVG_LOSS = 16.47
export const GAIN_TO_PAIN_RATIO = 2.39697
export const SORTINO_RATIO = 7.532204
export const MAX_DRAWDOWN_36M = 22.97
export const MAX_DRAWDOWN_50Y = 47.85
export const IRR_GEOMETRIC_MEAN = 48.66
export const IRR_ARITHMIC_MEAN = 108.01

export const EXPECTED_RETURN = ((WIN_RATIO / 100) * AVG_GAIN - (1 - WIN_RATIO / 100) * AVG_LOSS).toFixed(2)

export const DASHBOARD_GUTTER_SIZE = 24

export const SOCIAL_MEDIA_LINKS = [
  { href: 'https://www.facebook.com/formulastocks/', icon: 'facebook-f' },
  { href: 'https://twitter.com/FormulaStocks', icon: 'twitter' },
  { href: 'https://www.linkedin.com/company/formula-stocks', icon: 'linkedin' },
]

export const BLOG_POSTS = {
  BACKTESTING_BIAS: 'https://keepingstock.net/backtesting-bias-and-how-we-avoid-it-fe598930cb1',
}

export const PLANS = [
  {
    id: '',
    name: 'Monthly plan',
    price: 49.99,
    paymentSchedule: 'monthly',
    priceDescription: '$49.99 / month',
    icon: 'check',
  },
  {
    id: '',
    name: 'Yearly plan - Save 20%',
    price: 499.99,
    paymentSchedule: 'yearly',
    priceDescription: '$499.99 / year (20% off)',
    icon: 'tags',
  },
]
