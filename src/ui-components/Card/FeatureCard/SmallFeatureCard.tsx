import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space } from 'antd'

export interface CardProps {
    children: any;
    color: string;
    icon: string;
}

export const SmallIconContainer = styled.div`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 30px rgba(18, 62, 138, 0.1);
    font-size: 1.2rem;
    margin-right: 16px;
`

const Card = styled.div`
    width: 100%;
    display: flex;
    background: white;
    border-radius: 4px;
    border: 1px solid #ebedf5;
    box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
    box-sizing: border-box;
    padding: 12px 20px;
    text-align: center;

    &:hover {
        background: ${p => p.theme.palette.basic[200]};
    }
`

const Content = styled.div`
    margin: 0;
    font-size: 1rem;
    color: ${p => p.theme.palette.text[500]}
`

export const SmallFeatureCard = ({ children, color, icon }: CardProps) => (
    <Card>
        <Space align="center">
            <SmallIconContainer>
                {/* @ts-ignore */}
                <FontAwesomeIcon icon={['fad', icon]} color={color} />
            </SmallIconContainer>
            <Content>{children}</Content>
        </Space>
    </Card>
)
