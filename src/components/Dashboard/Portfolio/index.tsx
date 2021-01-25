import React from 'react'
import { Row, Col } from 'antd'
import { PortfolioChart, WelcomeStatus, Card } from '~/ui-components'
import Holdings from './Holdings'
import { ThemeProvider } from 'antd-theme'
// import { useTheme } from 'antd-theme';
// import { Select } from 'antd';

const GUTTER_SIZE = 24

// const ThemeSelect = () => {
//   const [{ name, variables, themes }, setTheme] = useTheme();
//   console.log("🚀 ~ file: index.tsx ~ line 12 ~ ThemeSelect ~ themes", themes)
//   console.log("🚀 ~ file: index.tsx ~ line 12 ~ ThemeSelect ~ variables", variables)
//   console.log("🚀 ~ file: index.tsx ~ line 12 ~ ThemeSelect ~ name", name)

//   return (
//     <>
//       <Select
//         style={{ width: 100 }}
//         value={name}
//         onChange={
//           (theme) => setTheme({ name: theme, variables })
//         }
//       >
//         {/* {
//           themes.map(
//             ({ name }) => (
//               <Select.Option key={name} value={name}>
//                 {name}
//               </Select.Option>
//             )
//           )
//         } */}
//       </Select>
//     </>
//   );
// };

const Portfolio = () => (
  // @ts-ignore
  <ThemeProvider>
    <div>
      <Row gutter={GUTTER_SIZE}>
        <Col span={24}>
          <WelcomeStatus />
          {/* <ThemeSelect /> */}
        </Col>
      </Row>
      <Row gutter={[GUTTER_SIZE, GUTTER_SIZE]}>
        <Col span={18}>
          <PortfolioChart />
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%' }}>latest sell signals</Card>
        </Col>
      </Row>
      <Row gutter={GUTTER_SIZE}>
        <Col span={24}>
          <Card>
            <Holdings />
          </Card>
        </Col>
      </Row>
    </div>
  </ThemeProvider>
)

export default Portfolio
