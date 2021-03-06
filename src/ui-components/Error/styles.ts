import styled from '@emotion/styled'

export const ErrorHeader = styled.h2`
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`

export const ErrorText = styled.p`
  color: ${(props: any) => props.theme.palette.text[500]};
  text-align: center;
`
