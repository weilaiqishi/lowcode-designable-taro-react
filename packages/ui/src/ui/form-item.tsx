import * as React from 'react'
import { Cell, CellProps } from '@nutui/nutui-react-taro'
import { Block } from '@tarojs/components'

import { ComponentDefaults } from '../components/type'

export interface FormItemProps extends CellProps {
  className?: string
  style?: React.CSSProperties
  label?: React.ReactNode
  required?: boolean
  feedbackText?: string
  errorMessageAlign?: TextAlign
  starPosition?: 'left' | 'right'
}

type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent'

const defaultProps = {
  ...ComponentDefaults,
  label: '',
  required: false,
  feedbackText: '',
  errorMessageAlign: 'left',
  starPosition: 'left',
} as FormItemProps

const FormItem = (props: FormItemProps) => {
  const {
    children,
    className,
    style,
    label,
    required,
    feedbackText,
    errorMessageAlign,
    starPosition,
  } = {
    ...defaultProps,
    ...props,
  }

  const renderStar = required && <i className='required' />
  const renderLabel = (
    <Block>
      {starPosition === 'left' ? renderStar : null}
      {label}
      {starPosition === 'right' ? renderStar : null}
    </Block>
  )
  return (
    <Cell className={`nut-form-item ${className}`} style={style}>
      {label ? (
        <div className='nut-cell-title nut-form-item-label'>{renderLabel}</div>
      ) : null}
      <div className='nut-cell-value nut-form-item-body'>
        <div className='nut-form-item-body-slots'>{children}</div>
        <div
          className='nut-form-item-body-tips'
          style={{
            textAlign: errorMessageAlign,
            display: feedbackText ? 'initial' : 'none',
          }}
        >
          {feedbackText}
        </div>
      </div>
    </Cell>
  )
}

export default FormItem
