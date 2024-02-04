import React, { ReactNode } from 'react'
import { IconFont } from '@nutui/icons-react-taro'
import { Image } from '@nutui/nutui-react-taro'
import { ImageProps } from '@nutui/nutui-react-taro/dist/types/index'

export type typeIconImageProps = Partial<{
  iconFontProps: Parameters<typeof IconFont>[0] & { iconName: string }
  imageProps: ImageProps
}>

export function getIconImageConfig (
  names: string[],
  record: Record<string, typeIconImageProps | undefined>
) {
  const IconImageConfig: Record<string, ReactNode> = {}
  names.forEach((name) => {
    if (record[name]?.imageProps?.src) {
      IconImageConfig[name] = <Image {...record[name]!.imageProps}></Image>
    } else if (record[name]?.iconFontProps?.iconName) {
      // @ts-ignore
      const { iconName, ...otherProps } = record[name].iconFontProps
      IconImageConfig[name] = (
        <IconFont {...otherProps} name={record[name]!.iconFontProps!.iconName}></IconFont>
      )
    }
  })

  return IconImageConfig
}

export function getIconImagePropsRecord (
  props: { [x: string]: any },
  propNames: string[]
) {
  return propNames.reduce<Record<string, typeIconImageProps>>(
    (record, name: string) => {
      record[name] = props[name]
      return record
    },
    {}
  )
}
