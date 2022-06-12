import React, { ReactElement,useEffect, useRef, useState } from 'react'
import { GeneralField, isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'
import { Text, View as TaroView } from '@tarojs/components'
import classNames from 'classnames'

import { useFormLayoutContext } from '../Form'

const View: any = TaroView

export interface IFormItemProps {
  className?: string
  style?: React.CSSProperties
  field: GeneralField
}

const useFormItemLayout = () => {
  const layout = useFormLayoutContext()
  return {
    bordered:  layout?.bordered ?? true,
    labelAlign:
      layout?.layout === 'vertical' ? layout?.labelAlign ?? 'left'
        :  layout?.labelAlign ?? 'right',
    labelCol: layout?.labelCol,
    labelWidth: layout?.labelWidth,
    labelWrap: layout?.labelWrap,
    layout: layout?.layout ?? 'horizontal',
    wrapperAlign:layout?.wrapperAlign,
    wrapperCol: layout?.wrapperCol,
    wrapperWidth: layout?.wrapperWidth,
    wrapperWrap: layout?.wrapperWrap,
  }
}

export const BaseItem: React.FC<React.PropsWithChildren<IFormItemProps>> = ({
  children,
  field,
}) => {
  const formLayout = useFormItemLayout()
  console.log(formLayout)
  const required = !isVoidField(field) && field.required && field.pattern !== 'readPretty'
  return <View className={classNames('at-row',{ 'at-hairline-bottom': formLayout.bordered })}>
    <View className={classNames(`at-col`,`at-col-${formLayout.labelCol}`)}>
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
    <View className={`at-col at-col-${formLayout.wrapperCol}`}>{children}</View>
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
