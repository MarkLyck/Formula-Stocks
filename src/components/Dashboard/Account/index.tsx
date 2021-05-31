import { useQuery, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY, USER_UPDATE } from 'src/common/queries'
import { DashboardHeader } from 'src/ui-components'
import ManageSubscription from './ManageSubscription'
import Statistics from './Statistics'

const Account = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  const [updateUser] = useMutation(USER_UPDATE)

  const user = data?.user

  return (
    <div>
      <DashboardHeader title="My Account" showExchangeStatuses={false} />
      <Statistics user={user} />
      <ManageSubscription subscription={user?.stripe.subscription} updateUser={updateUser} user={user} />
    </div>
  )
}

export default Account
