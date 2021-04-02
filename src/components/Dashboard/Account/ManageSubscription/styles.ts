import styled from '@emotion/styled'

export const StatusLine = styled.p`
  font-weight: 500;
  margin-bottom: 8px;
`

export const Description = styled.p`
  font-weight: 400;
`

export const modalContentStyles = {
  content: {
    top: '50%',
    right: 'unset',
    bottom: 'unset',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 24px 8px 24px',
    border: 'none',
    borderRadius: '4px',
    margin: 'auto',
    width: '400px',
    boxSizing: 'border-box',
  },
}

export const ModalText = styled.p`
  margin-bottom: 16px;
`
