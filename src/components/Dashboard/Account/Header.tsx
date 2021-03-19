import { Typography } from 'antd'

const { Title, Text } = Typography

type HeaderProps = {
  user: any
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div>
      <Title level={4}>Welcome back, {user?.firstName}</Title>
      <Text>{user.email}</Text>
    </div>
  )
}

export default Header
