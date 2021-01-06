import styled from '@emotion/styled'

// color: ${props => (props.isActive ? props.theme.colors.primary : '#c0c6d3')};

export const Button = styled.button`
  position: relative;
  width: 100%;
  height: 68px;
  padding: 8px 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: none;
  border: none;

  outline: none;
  &::after {
    content: '';
    background: ${(props: any) => (props.isActive ? props.theme.palette.primary[500] : 'none')};
    width: 5px;
    height: 32px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    transition: all 0.2s;
  }

  h4,
  svg {
    color: ${(props: any) => (props.isActive ? props.theme.palette.primary[500] : '#A0A0B9')};

    margin: 0;
  }

  svg {
    ${(props: any) => (props.disabled ? 'opacity: 0.5;' : '')}
    font-size: 24px;
  }
  h4 {
    ${(props: any) => (props.disabled ? 'opacity: 0.5;' : '')}
    text-transform: capitalize;
    min-width: 50px;
    max-width: 64px;
    display: block;
    text-align: center;
    font-size: 10px;
    margin-top: 4px;
    white-space: nowrap;
  }
  &:hover {
    cursor: ${(props: any) => (props.disabled ? 'default' : 'pointer')};

    h4,
    svg {
      color: ${(props: any) => (props.logout ? props.theme.palette.danger[500] : props.theme.palette.primary[500])};
      ${(props: any) => (props.disabled ? 'color: #c0c6d3;' : '')};
    }
  }

  @media(min-width: ${p => p.theme.breakpoints.medium}) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 8px 24px;

    h4 {
      font-size: 1rem;
    }
  }  
`

export const IconContainer = styled.div`
  @media(min-width: ${p => p.theme.breakpoints.medium}) {
    width: 40px;
    margin-right: 8px;
    display: flex;
  }  
`
export const Badge = styled.p`
  position: absolute;
  top: 8px;
  right: 32px;
  opacity: 0.8;
  background: ${(props: any) => props.theme.palette.primary[500]};
  border-radius: 4px;
  padding: 0px 6px;
  padding-top: 2px;
  font-weight: 400;
  font-size: 0.6rem;
  color: white;
  @media (max-width: 1439px) and (min-width: 850px) {
    display: none;
  }
`
