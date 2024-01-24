import React from 'react'
import { ArrayField } from '@formily/core'
import { ISchema } from '@formily/json-schema'
import {
  observer,
  RecursionField,
  useField,
  useFieldSchema,
  useForm,
} from '@formily/react'
import { View as TaroView } from '@tarojs/components'
import cls from 'classnames'

import ArrayBase, { ArrayBaseMixins } from '../ArrayBase'

const View: any = TaroView

type typeProps = {
  children?: React.ReactNode
  [propName: string]: any
}

export const ArrayViews = observer((props: typeProps) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  const dataSource = Array.isArray(field.value) ? field.value : []
  if (!schema) throw new Error('can not found schema object')

  const renderItems = () => {
    return dataSource?.map((item, index) => {
      const items = Array.isArray(schema.items)
        ? schema.items[index] || schema.items[0]
        : schema.items

      if (!items) {
        throw new Error('can not found items schema object')
      }

      const content = (
        <RecursionField
          schema={items}
          name={index}
          filterProperties={() => {
            return true
          }}
        ></RecursionField>
      )
      return (
        <ArrayBase.Item
          key={index}
          index={index}
          record={() => field.value?.[index]}
        >
          {content}
        </ArrayBase.Item>
      )
    })
  }

  return <ArrayBase>{renderItems()}</ArrayBase>
})
