import React from 'react'
import { GeneralField, isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'
import { Field } from '@taroify/core'
import classNames from 'classnames'

import { pickDataProps } from '../__builtins__'

export interface IFormItemProps {
  className?: string
  style?: React.CSSProperties
  field: GeneralField
  decoratored: boolean
}

export const BaseItem: React.FC<React.PropsWithChildren<IFormItemProps>> = ({
  className,
  style,
  children,
  field,
  ...props
}) => {
  const required =
    !isVoidField(field) && field.required && field.pattern !== 'readPretty'
  return (
    <Field
      className={classNames(className)}
      style={style}
      {...pickDataProps(props)}
      label={field.title}
      required={required}
    >
      {children}
    </Field>
  )
}

export const FormItem = connect(
  BaseItem,
  mapProps((props, field) => {
    return {
      ...props,
      field,
    }
  })
)
