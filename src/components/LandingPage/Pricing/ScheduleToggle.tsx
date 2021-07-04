import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const Container = styled.div`
  position: relative;
  width: 240px;
  height: 40px;
  border-radius: 50px;
  background-color: ${(p) => p.theme.palette.neutral[300]};
  display: flex;
  align-items: center;
  padding: 4px;
  justify-content: ${(p: any) => (p.isOn ? 'flex-end' : 'flex-start')};
  cursor: pointer;
`

const Handle = styled(motion.div)`
  width: 120px;
  height: 30px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${(p) => p.theme.palette.primary[600]};
  z-index: 1;
`

const UnselectedTextRight = styled.div`
  position: absolute;
  right: 4px;
  width: 120px;
  text-align: center;
  z-index: 0;
  font-weight: bold;
  color: ${(p) => p.theme.palette.neutral[700]};
`

const UnselectedTextLeft = styled.div`
  position: absolute;
  left: 4px;
  width: 120px;
  text-align: center;
  z-index: 0;
  font-weight: bold;
  color: ${(p) => p.theme.palette.neutral[700]};
`

const spring = {
  type: 'spring',
  stiffness: 1700,
  damping: 30,
}

type ScheduleToggleProps = {
  term: 'annually' | 'monthly'
  setTerm: (term: 'annually' | 'monthly') => void
}

const ScheduleToggle = ({ term, setTerm }: ScheduleToggleProps) => {
  const toggleSwitch = () => {
    setTerm(term === 'monthly' ? 'annually' : 'monthly')
  }

  return (
    // @ts-ignore
    <Container isOn={term === 'monthly'} onClick={toggleSwitch}>
      <Handle layout transition={spring}>
        {term === 'annually' ? 'Yearly' : 'Monthly'}
      </Handle>
      <UnselectedTextLeft>Yearly</UnselectedTextLeft>
      <UnselectedTextRight>Monthly</UnselectedTextRight>
    </Container>
  )
}

export default ScheduleToggle
