import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonIcon } from '~/ui-components'

import styled from '@emotion/styled'

const StyledButton = styled(Button)`
  width: inherit;
  margin-bottom: 16px;
  padding: 8px 16px;
  margin-top: auto;
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
  // @ts-ignore
  if (window.$crisp) {
    // @ts-ignore
    window.$crisp.push(['do', 'chat:show'])
    // @ts-ignore
    window.$crisp.push(['do', 'chat:open'])
  }
}

const SupportButton = ({ user }: { user: any }) => (
  <StyledButton backgroundColor="primary" color="white" size="thin" onClick={() => handleClick(user)}>
    <ButtonIcon icon="question-circle" /><span>Support</span>
  </StyledButton>
)

export default SupportButton
