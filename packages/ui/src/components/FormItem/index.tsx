import React from 'react'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'

import FormItemBase from './form-item'

export const FormItem = connect(
  FormItemBase,
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
      // field,
      label: props.label || field.title,
      required:
        !isVoidField(field) && field.required && field.pattern !== 'readPretty',
      feedbackStatus: takeFeedbackStatus(),
      feedbackText: takeMessage(),
    }
  })
)
