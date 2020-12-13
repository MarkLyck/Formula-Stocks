import React from 'react'
import styled from '@emotion/styled'
import { Card } from '~/ui-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export interface CardProps {
    children: any
}

export const FeatureCard = ({ children }) => (
    <Card>
        <FontAwesomeIcon icon="brain" />
        {children}
    </Card>
)
