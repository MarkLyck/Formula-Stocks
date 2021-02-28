import { Layout, Button } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Header } = Layout

const Logo = styled.img`
  padding: 12px 0;
  height: 60px;
  transform: translateX(-50%);
  left: 50%;
  position: absolute;
  display: block;
`

const StyledButton = styled(Button)`
  &&& {
    width: 64px;
    height: 64px;
    border: none;
    border-right-width: 0px;
    position: absolute;
  }
`

const StyledHeader = styled(Header)`
  &&& {
    background-color: ${(p) => p.theme.palette.neutral[100]};
    padding-left: 0px;
  }
`

export type NavbarProps = {
  toggleSideMenu: () => void
}

const Navbar = ({ toggleSideMenu }: NavbarProps) => (
  <StyledHeader>
    <StyledButton aria-label="menu" data-testid="toggle-menu-btn" onClick={toggleSideMenu}>
      <FontAwesomeIcon icon={['far', 'bars']} />
    </StyledButton>
    <Logo role="img" alt="logo" src="/logos/logo_horizontal_color.svg" />
  </StyledHeader>
)

export default Navbar
