import React from 'react'
import { Button, ButtonIcon } from '~/ui-components'

import styled from '@emotion/styled'

const Container = styled.div`
margin-top: auto;
padding: 8px 16px;
width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  color: ${(props: any) => props.theme.colors.white};

  @media(max-width: ${p => p.theme.breakpoints.medium}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    font-size: 10px;

    svg {
      margin-right: 0;
      font-size: 16px;
      margin-bottom: 4px;
    }
  }  
`

// @media (max-width: 1439px) and (min-width: 850px) {
//   padding: 8px;
//   svg {
//     display: none;
//   }
// }

// @media (max-width: 550px) {
//   padding: 0px 16px;
// }

const handleClick = (user: any) => {
  console.log('handleClick', user)
  // @ts-ignore
  if (window.$crisp) {
    // @ts-ignore
    window.$crisp.push(['do', 'chat:show'])
    // @ts-ignore
    window.$crisp.push(['do', 'chat:open'])
  }
}

const SupportButton = ({ user }: { user: any }) => (
  <Container>
    <StyledButton onClick={() => handleClick(user)}>
      <ButtonIcon icon="question-circle" /><span>Support</span>
    </StyledButton>
  </Container>
)

export default SupportButton
