import { subscriptionMock } from './subscription'

export const USER_MOCK = {
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

export const USER_LOGIN_MOCK = {
  success: true,
}

export const USER_SIGNUP_MOCK = {
  success: true,
}

export const USER_LOGIN_FAILED_MOCK = {
  data: {
    userLogin: null,
  },
  errors: [
    {
      message: 'AuthenticationProfile not found',
      locations: [
        {
          line: 2,
          column: 3,
        },
      ],
      path: ['userLogin'],
      code: 'EntityNotFoundError',
      details: {
        profile: 'AuthenticationProfile not found',
      },
    },
  ],
}
