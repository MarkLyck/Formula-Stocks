import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select } from 'antd'

const { Option } = Select

const StyledSelect = styled(Select)`
  width: 100%;
  && {
    .ant-select-selector {
      padding: 10px 8px;
      height: auto;
    }

    .ant-select-arrow {
      top: 50%;
      right: 24px;
    }

    .ant-select-selection-item {
      display: flex;
    }
  }

  svg {
    font-size: 1rem;
  }

  input {
    font-size: 1rem;
    margin-left: 8px;
  }
`

const PlanOption = styled.div`
  padding: 16px;
`

const Label = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: ${(props: any) => props.theme.palette[props.primary ? 'primary' : 'success'][500]};
  }
`

const PlanTitle = styled.h4`
  font-weight: 500;
  margin-bottom: 8px;

  svg {
    margin-right: 8px;
    color: ${(props: any) => props.theme.palette[props.primary ? 'primary' : 'success'][500]};
  }
`

const OldPrice = styled.span`
  text-decoration: line-through;
  font-weight: 600;
`

interface PlanPickerProps {
  onChange: (value: any) => void
}

export const PlanPicker = ({ onChange }: PlanPickerProps) => (
  <StyledSelect placeholder="Select a plan" defaultValue={['weekly']} onChange={onChange} optionLabelProp="label">
    <Option
      value="weekly"
      label={
        // @ts-ignore
        <Label primary>
          <FontAwesomeIcon icon={['fad', 'check-square']} />
          Weekly plan - $29 / week
        </Label>
      }
    >
      <PlanOption className="demo-option-label-item">
        {/* @ts-ignore */}
        <PlanTitle primary>
          <FontAwesomeIcon icon={['fad', 'check-square']} />
          Weekly plan
        </PlanTitle>
        $29 / week
      </PlanOption>
    </Option>
    <Option
      value="yearly"
      label={
        <Label>
          <FontAwesomeIcon icon={['fas', 'tags']} />
          Yearly plan - $1,200 / year (Save 20%)
        </Label>
      }
    >
      <PlanOption className="demo-option-label-item">
        <PlanTitle>
          <FontAwesomeIcon icon={['fas', 'tags']} />
          Yearly plan - Save 20%
        </PlanTitle>
        $1,200 / year (20% off <OldPrice>$1,508</OldPrice>)
      </PlanOption>
    </Option>
  </StyledSelect>
)
