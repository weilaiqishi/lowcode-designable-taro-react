import React, { createContext, useContext } from 'react'
import { isValid} from '@formily/shared'
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

const Input: React.FC<React.PropsWithChildren<AtInputProps>> = (props) => {
  return (
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
