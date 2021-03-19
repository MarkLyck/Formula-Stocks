import { useQuery } from '@apollo/client'

import { CURRENT_USER_QUERY } from 'src/common/queries'
import Header from './Header'

const Account = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  const user = data?.user
  console.log('🔈 ~ user', user)

  return (
    <div>
      <Header user={user} />
    </div>
  )
}

export default Account
