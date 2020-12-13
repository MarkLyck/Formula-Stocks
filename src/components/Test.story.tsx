import React from 'react'
import Test from './Test'

export default {
    title: 'Test',
}

const TemplateWithText = (args) => <Test />

export const withText = TemplateWithText.bind({})