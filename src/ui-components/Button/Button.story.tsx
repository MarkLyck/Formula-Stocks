import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './index';

export default {
    title: 'ui-components/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>{args.label}</Button>;

export const Primary = Template.bind({});
Primary.args = {
    label: 'BUTTON',
};

export const Outline = Template.bind({});
Outline.args = {
    appearance: 'outline',
    label: 'BUTTON',
};

export const Ghost = Template.bind({});
Ghost.args = {
    appearance: 'ghost',
    label: 'BUTTON',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'BUTTON',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'BUTTON',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'BUTTON',
    disabled: true,
};