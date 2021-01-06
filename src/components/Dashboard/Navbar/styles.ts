import styled from '@emotion/styled'

export const Logo = styled.div`
  background-image: url('/static/icons/logo_horizontal_color.svg');
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  width: 240px;
  height: 40px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 260px) {
    width: 40px;
    background-image: url('/static/icons/logo_icon_color.svg');
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: #c0c6d3;
  font-size: 1.4rem;
  padding: 8px;
  transition: all 0.2s;

  &:hover {
    color: ${(props: any) => props.theme.colors.primary};
  }

  @media (min-width: 850px) {
    display: none;
  }
`

export const Bar = styled.div`
  height: 72px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 32px 0 24px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  border-bottom: 1px solid #eeeff3;
  align-items: center;
  background: ${(props: any) => props.theme.colors.white};
  z-index: 15;

  button {
    margin-right: 8px;
  }
  svg:hover {
    cursor: pointer;
  }

  @media (max-width: 850px) {
    padding-left: 12px;
  }
`

export default null
