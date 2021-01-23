import styled from '@emotion/styled'

export const MenuList = styled.div`
  position: relative;
  padding: 8px 0 0 0;
  margin: 0;
  width: 240px;
  background: ${(props: any) => props.theme.palette.side_menu_color};
  border-right: 1px solid #eeeff3;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
