import { useQuery, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY, USER_UPDATE } from 'src/common/queries'

import Header from './Header'
import ManageSubscription from './ManageSubscription'

const Account = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  const [updateUser] = useMutation(USER_UPDATE)

  const user = data?.user

  return (
    <div>
      <Header user={user} />
      <ManageSubscription subscription={user?.stripe.subscription} updateUser={updateUser} user={user} />
    </div>
  )
}

export default Account
