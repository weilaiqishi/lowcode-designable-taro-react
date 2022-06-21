import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { GeneralField, isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'
import { Text, View as TaroView } from '@tarojs/components'
import classNames from 'classnames'

import { pickDataProps } from '../__builtins__'
import { FormLayoutProps, useFormLayoutContext } from '../Form'

const View: any = TaroView

export interface IFormItemProps extends FormLayoutProps {
  className?: string
  style?: React.CSSProperties
  field: GeneralField,
  decoratored: boolean
}

const useFormItemLayout = (props: FormLayoutProps) => {
  const layout = useFormLayoutContext()
  return {
    bordered: props.bordered ?? layout?.bordered ?? true,
    labelAlign: props.labelAlign ?? layout?.labelAlign ?? 'left',
    labelCol: props.labelCol ?? layout?.labelCol,
    labelWidth: props.labelWidth ?? layout?.labelWidth,
    wrapperAlign: props.wrapperAlign ?? layout?.wrapperAlign,
    wrapperCol: props.wrapperCol ?? layout?.wrapperCol,
    wrapperWidth: props.wrapperWidth ?? layout?.wrapperWidth
  }
}

export const BaseItem: React.FC<React.PropsWithChildren<IFormItemProps>> = ({
  children,
  field,
  ...props
}) => {
  const formLayout = useFormItemLayout(props)
  const required = !isVoidField(field) && field.required && field.pattern !== 'readPretty'

  const labelStyle = props.style || {
    width: 'inherit'
  }
  const wrapperStyle = field.componentProps.style || {
    width: 'inherit'
  }
  // 固定宽度
  let enableCol = false
  const { labelWidth, wrapperWidth, labelCol, wrapperCol } = formLayout
  labelStyle.width = labelStyle.width === 'inherit' ? undefined : (labelStyle.width || labelWidth)
  wrapperStyle.width = wrapperStyle.width === 'inherit' ? undefined : (wrapperStyle.width || wrapperWidth)
  // 栅格模式
  if (labelCol || wrapperCol) {
    if (!labelStyle.width && !wrapperStyle.width) {
      enableCol = true
    }
  }
  return <View {...pickDataProps(props)} className={classNames('at-row',{ 'at-hairline-bottom': formLayout.bordered })}>
    <View
      className={
        classNames({
          'at-col': enableCol,
          [`at-col-${formLayout.labelCol}`]: enableCol
        })
      }
      style={labelStyle}
    >
      <View className={`at-row at-row__align--center`} style={{ height: '100%' }}>
        <View
          className={classNames('at-col at-input__title',
            {
              'at-input__title--required': required,
            }
          )}
          style={{ width: 'auto', textAlign: formLayout.labelAlign }}
        >
          {field.title}
        </View>
      </View>
    </View>
    <View
      className={
        classNames({
          'at-col': enableCol,
          [`at-col-${formLayout.wrapperCol}`]: enableCol
        })
      }
      style={{
        ...labelStyle,
        overflow: 'hidden'
      }}
    >{children}</View>
  </View>
}

export const FormItem =  connect(
  BaseItem,
  mapProps((props, field) => {
    return {
      ...props,
      field
    }
  })
)
