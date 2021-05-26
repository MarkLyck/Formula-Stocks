import styled from '@emotion/styled'

const WelcomeBack = styled.h2`
  color: ${(props: any) => props.theme.palette.neutral[800]};
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: 100;
  margin-bottom: 0px;
`

const Subtitle = styled.h4`
  color: ${(props: any) => props.theme.palette.neutral[800]};
  margin-bottom: 24px;
`

const NameSpan = styled.span`
  font-weight: bold;
`

type AccountHeaderProps = {
  user: any
}

const AccountHeader = ({ user }: AccountHeaderProps) => {
  return (
    <>
      <WelcomeBack>
        Welcome back, <NameSpan>{user?.firstName}</NameSpan>
      </WelcomeBack>
      <Subtitle>{user?.email}</Subtitle>
    </>
  )
}

export default AccountHeader
