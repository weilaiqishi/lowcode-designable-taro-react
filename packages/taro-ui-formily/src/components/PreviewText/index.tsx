import React, { createContext, useContext } from 'react'
import { Field } from '@formily/core'
import { observer, useField } from '@formily/react'
import { isArr, isValid, toArr } from '@formily/shared'
import { View as TaroView } from '@tarojs/components'
import cls from 'classnames'
import { AtInputProps } from 'taro-ui/types/input'

const View: any = TaroView

const PlaceholderContext = createContext<React.ReactNode>('N/A')

const Placeholder = PlaceholderContext.Provider

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return isValid(value) && value !== '' ? value : placeholder
}

interface IGetValueByValue {
  (
    array: any[],
    inputValue: any,
    keyMap?: { inputKey?: string; outputKey?: string; childrenKey?: string },
    path?: any[]
  ): any
}

const getValueByValue: IGetValueByValue = (
  array,
  inputValue,
  keyMap,
  path = []
) => {
  const {
    inputKey = 'value',
    outputKey = 'label',
    childrenKey = 'children',
  } = keyMap || {}
  let outputValue: any
  if (isArr(array)) {
    if (isArr(inputValue)) {
      outputValue = inputValue.map((v) =>
        getValueByValue(array, v, keyMap, path)
      )
    } else {
      array.forEach((obj) => {
        if (outputValue === undefined) {
          const currentPath = [...path, obj?.[outputKey]]
          if (obj?.[inputKey] === inputValue) {
            outputValue = {
              leaf: obj?.[outputKey],
              whole: currentPath,
            }
          } else if (obj?.[childrenKey]?.length) {
            outputValue = getValueByValue(
              obj?.[childrenKey],
              inputValue,
              keyMap,
              currentPath
            )
          }
        }
      })
    }
    return outputValue
  }
  return undefined
}

const Input: React.FC<React.PropsWithChildren<AtInputProps>> = (props) => {
  return (
    // <Space className={cls(prefixCls, props.className)} style={props.style}>
    //   {props.addonBefore}
    //   {props.prefix}
    //   {usePlaceholder(props.value)}
    //   {props.suffix}
    //   {props.addonAfter}
    // </Space>
    <View className={cls('at-input', props.className)}>
      {usePlaceholder(props.value)}
    </View>
  )
}

const Text = (props: React.PropsWithChildren<any>) => {
  return (
    <View className={cls( props.className)} style={props.style}>
      {usePlaceholder(props.value)}
    </View>
  )
}

Text.Input = Input
Text.Placeholder = Placeholder
Text.usePlaceholder = usePlaceholder

export const PreviewText = Text

export default PreviewText
