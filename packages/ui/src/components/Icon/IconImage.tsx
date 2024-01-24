import React, { ReactNode } from 'react'
import { IconFont } from '@nutui/icons-react-taro'
import { Image } from '@nutui/nutui-react-taro'
import { ImageProps } from '@nutui/nutui-react-taro/dist/types/index'

export type typeIconImageProps = Partial<{
  iconFontProps: Parameters<typeof IconFont>[0]
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
    } else if (record[name]?.iconFontProps?.name) {
      IconImageConfig[name] = (
        <IconFont {...record[name]!.iconFontProps}></IconFont>
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
