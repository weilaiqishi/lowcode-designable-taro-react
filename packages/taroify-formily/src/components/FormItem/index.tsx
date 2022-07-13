/* eslint-disable react/no-children-prop */
import React from 'react'
import { GeneralField, isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'
import { Field, Form } from '@taroify/core'
import { createVariantElement } from '@taroify/core/utils/element'
import { View as TaroView } from '@tarojs/components'
import classNames from 'classnames'

import FormItemBase from '../../ui/form-item'
import { pickDataProps } from '../__builtins__'

const View: any = TaroView

export interface IFormItemProps {
  className?: string
  style?: React.CSSProperties
  field: GeneralField
  colon: boolean // 是否有冒号
  labelAlign?: 'left' | 'center' | 'right' // label对齐方式
  wrapperAlign?: 'left' | 'center' | 'right' // 组件对齐方式
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending'
  [propName: string]: any
}

export const BaseItem: React.FC<React.PropsWithChildren<IFormItemProps>> = ({
  className,
  style,
  children,
  field,
  colon = true,
  labelAlign = 'left',
  wrapperAlign = 'left',
  feedbackStatus,
  feedbackText,
  ...props
}) => {
  const required =
    !isVoidField(field) && field.required && field.pattern !== 'readPretty'
  return (
    <FormItemBase
      required={required}
      bordered
      className={className}
      style={style}
      {...pickDataProps(props)}
    >
      <Form.Label align={labelAlign} colon={colon}>
        {field.title}
      </Form.Label>
      {children && <Form.Control children={children} align={wrapperAlign} />}
      {feedbackStatus !== 'pending' && (
        <Form.Feedback
          status={
            feedbackStatus === 'success'
              ? 'valid'
              : feedbackStatus === 'error'
                ? 'invalid'
                : 'warning'
          }
        >
          {feedbackText}
        </Form.Feedback>
      )}
    </FormItemBase>
  )
}

export const FormItem = connect(
  BaseItem,
  mapProps((props, field) => {
    if (isVoidField(field))
      return {
        ...props,
        field,
      }
    const takeFeedbackStatus = () => {
      if (field.validating) return 'pending'
      return field.decoratorProps.feedbackStatus || field.validateStatus
    }
    const takeMessage = () => {
      const split = (messages: any[]) => {
        return messages.reduce((buf, text, index) => {
          if (!text) return buf
          return index < messages.length - 1
            ? buf.concat([text, ', '])
            : buf.concat([text])
        }, [])
      }
      if (field.validating) return
      if (props.feedbackText) return props.feedbackText
      if (field.selfErrors.length) return split(field.selfErrors)
      if (field.selfWarnings.length) return split(field.selfWarnings)
      if (field.selfSuccesses.length) return split(field.selfSuccesses)
    }
    return {
      ...props,
      field,
      feedbackStatus: takeFeedbackStatus(),
      feedbackText: takeMessage(),
    }
  })
)
