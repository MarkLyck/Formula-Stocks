import React from 'react'
import { Space } from 'antd'
import { ScalingTitle, LandingPageContainer, Card } from '~/ui-components'

const HowDoIUseIt = () => (
    <LandingPageContainer align="center">
        <ScalingTitle>
            So... How do I use it?
        </ScalingTitle>
        <Space>
            <Card>
                1. Mirror our portfolio
            </Card>
            <Card>
                2. Follow our trades
            </Card>
            <Card>
                3. Wait
            </Card>
        </Space>
    </LandingPageContainer>
)

export default HowDoIUseIt
