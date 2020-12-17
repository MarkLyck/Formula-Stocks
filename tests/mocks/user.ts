import { subscriptionMock } from './subscription'

export const userMock = {
  id: 'ck40ei37x00ye08js7guo95e3',
  intros: {
    reports: true,
    weeklyStocktip: true,
  },
  createdAt: '2019-12-10T21:52:49.870Z',
  firstName: 'Mock',
  lastName: 'McMockings',
  email: 'mock@email.com',
  phoneNumber: '+19294864636',
  type: 'admin',
  stripe: {
    subscription: subscriptionMock,
  },
}
