import React from 'react'
import { Space } from 'antd'
import styled from '@emotion/styled'
import { SocialMediaLink, Disclaimer } from '~/ui-components'
import { COMPANY_NAME, SOCIAL_MEDIA_LINKS } from '~/common/constants'

const Logo = styled.img`
    height: 48px;
    margin-bottom: 16px;
`

const Container = styled.div`
    background-color: #3C3FA3;
    background-image: url("/images/space/stars.svg"), url("/images/space/footer-transition.svg");
    background-size: 100%;
    background-repeat: repeat, no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 32px;
    padding-top: 380px;
    text-align: center;
`



const MainDisclaimer = styled(Disclaimer)`
color: ${p => p.theme.palette.text[100]};
text-align: justify;  
line-height: 1.4rem;
max-width: 1400px;
`

const FooterDisclaimer = styled(Disclaimer)`
    color: ${p => p.theme.palette.text[100]};
`

const Divider = styled.div`
width: 100%;
height: 2px;
background-color: ${p => p.theme.palette.text[100]};
max-width: 1400px;
`


const Footer = () => (
    <Container  >
        <Space direction="vertical" size="middle">
            <Logo src="/logos/logo_horizontal.svg" />
            <Space size="middle">
                {SOCIAL_MEDIA_LINKS.map(link => <SocialMediaLink key={link.href} {...link} />)}
            </Space>
            <FooterDisclaimer>
                By accessing the Site and any pages thereof, you agree to be bound by the {COMPANY_NAME} Terms of Use and Privacy Policy.
            </FooterDisclaimer>
            <MainDisclaimer>
                {COMPANY_NAME} is an information provider, not an investment advisory service or a{' '}
                registered investment advisor, does not offer individual investment advice and does not manage client funds.{' '}
                Unless otherwise specified, all return figures shown above are for illustrative purposes only.{' '}
                {COMPANY_NAME} does not purport to tell which securities individual customers should buy or sell for{' '}
                themselves and recommendations are not solicitations to buy or sell a security,{' '}
                Like a newsletter {COMPANY_NAME} offer a model portfolio, which members can choose to use as an input in{' '}
                their own decisionmaking process. {COMPANY_NAME} assumes no responsibility or liability for your investment{' '}
                results. You understand and acknowledge that there is risk involved in investing in securities.{' '}
                For technical reasons the website displays up-to-date graph data refreshed daily based on backtested data.{' '}
                Backtested performance results have certain inherent limitations, as they could potentially be designed with{' '}
                some benefit of hindsight, even though every effort have been made to avoid such risk. Unlike an actual{' '}
                performance record such as the one mentioned above, backtested results do not represent actual trading and{' '}
                may not be impacted by brokerage and other slippage fees. Also, since transactions may or may not have been{' '}
                executed, results may have under- or over-compensated for impact, if any, of certain market factors,{' '}
                such as lack of market liquidity or level of participation. Past results of any investment system are not{' '}
                necessarily indicative of future results. No representation is being made that you are likely to achieve{' '}
                profits or losses similar to those shown here. In addition, information, system output, articles,{' '}
                and other features of our products are provided for educational and informational purposes only and should{' '}
                not be construed as investment advice. It remains the user’s exclusive responsibility to review and evaluate{' '}
                the content and to determine whether to accept or reject any content. {COMPANY_NAME} expresses no opinion as{' '}
                to whether any of the website content is appropriate for a user’s investment portfolio, strategy,{' '}
                financial situation, or investment objective(s).
            </MainDisclaimer>
        </Space>
    </Container >
)

export default Footer
