// fork for supporting designable props

import * as React from 'react'
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react'
import { CellBase, CellProps, CellValue } from '@taroify/core/cell'
import Form from '@taroify/core/form'
import { prefixClassname } from '@taroify/core/styles'
import { isElementOf } from '@taroify/core/utils/validate'
import { cloneIconElement } from '@taroify/icons/utils'
import { View as _View } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import classNames from 'classnames'
import * as _ from 'lodash'

import { pickDataProps } from '../components/__builtins__'

const View: any = _View
export interface FormItemProps extends CellProps {
  name?: string
  defaultValue?: any
  required?: boolean
  children?: ReactNode
}

interface FormItemChildren {
  label?: ReactElement
  control?: ReactElement
  feedbacks?: ReactElement[]
}

function useFormItemChildren(children?: ReactNode): FormItemChildren {
  return useMemo<FormItemChildren>(() => {
    const __children__: FormItemChildren = {
      feedbacks: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return
      }

      const element = child as ReactElement
      const { type: elementType } = element as ReactElement<InputProps>
      if (isElementOf(element, Form.Label)) {
        __children__.label = element
      } else if (elementType === Form.Control) {
        __children__.control = element
      } else if (isElementOf(element, Form.Feedback)) {
        __children__.feedbacks?.push(element)
      }
    })
    return __children__
  }, [children])
}

const FormItem = (props: FormItemProps) => {
  const {
    className,
    style,
    name,
    defaultValue,
    align,
    bordered,
    icon,
    rightIcon,
    clickable,
    required,
    children: childrenProp,
    onClick,
    ..._props
  } = props

  const { label, control, feedbacks } = useFormItemChildren(childrenProp)

  const explain = useMemo(
    () => !_.isEmpty(feedbacks),
    [feedbacks]
  )

  return (
    <CellBase
      {...pickDataProps(_props)}
      className={classNames(prefixClassname('form-item'), className)}
      style={style}
      bordered={bordered}
      align={align}
      clickable={clickable}
      icon={cloneIconElement(icon, {
        className: prefixClassname('form-item__icon'),
      })}
      rightIcon={cloneIconElement(rightIcon, {
        className: prefixClassname('form-item__right-icon'),
      })}
      required={required}
      onClick={onClick}
    >
      {label}
      <CellValue alone={false}>
        {control}
        {explain && (
          <View className={classNames(prefixClassname('form__feedbacks'))}>
            {feedbacks}
          </View>
        )}
      </CellValue>
    </CellBase>
  )
}

export default FormItem
