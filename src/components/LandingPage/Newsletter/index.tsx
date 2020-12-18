import React from 'react'
import { Space, Input, Button } from 'antd'
import styled from '@emotion/styled'
import { LandingPageContainer, Card } from '~/ui-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import theme from '~/lib/theme'

const CardTitle = styled.h4`
    margin: 0;
    font-size: 1.8vw;
    font-weight: bold;
`

const CardSubtitle = styled.h5`
    font-size: 1.2vw;
    color: ${p => p.theme.palette.text[200]};
    font-weight: 500;
`

const Content = styled.div`
    padding: 16px;
`

const InputIcon = styled(FontAwesomeIcon)`
    margin-right: 8px;
`

const Newsletter = () => (
    <LandingPageContainer align="center" marginBottom="8vw" >
        <Card>
            <Content>
                <Space direction="vertical">
                    <CardTitle>
                        Don't believe us yet? Let us prove it!
                    </CardTitle>
                    <CardSubtitle>
                        Join our newsletter, to receive emails with <strong>actual realtime results</strong> of our investment signals (good or bad).
                    </CardSubtitle>
                    <Space>
                        <Input size="large" placeholder="First name" prefix={<InputIcon icon={['fad', 'user']} color={theme.palette.basic[500]} />} />
                        <Input size="large" placeholder="Email address" prefix={<InputIcon icon={['fad', 'envelope']} color={theme.palette.basic[500]} />} />
                        <Button size="large" type="primary">Join newsletter</Button>
                    </Space>
                </Space>
            </Content>
        </Card>
    </LandingPageContainer>
)

export default Newsletter
