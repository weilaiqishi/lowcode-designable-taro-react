import React, { createContext, useContext } from 'react'
import { ArrayField } from '@formily/core'
import {
  JSXComponent,
  RecordScope,
  RecordsScope,
  Schema,
  useField,
  useFieldSchema,
} from '@formily/react'
import { clone,isValid } from '@formily/shared'
import cls from 'classnames'

export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: ArrayField
  schema: Schema
}

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export type ArrayBaseMixins = {
  useArray?: () => IArrayBaseContext | null
  useIndex?: (index?: number) => number | undefined
  useRecord?: (record?: number) => any
}

export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onCopy?: (index: number) => void
  onRemove?: (index: number) => void
  onMoveDown?: (index: number) => void
  onMoveUp?: (index: number) => void
}

type ComposedArrayBase = React.FC<React.PropsWithChildren<IArrayBaseProps>> &
  ArrayBaseMixins & {
    Item: React.FC<React.PropsWithChildren<IArrayBaseItemProps>>
    mixin?: <T extends JSXComponent>(target: T) => T & ArrayBaseMixins
  }

const ArrayBaseContext = createContext<IArrayBaseContext | null>(null)

const ItemContext = createContext<IArrayBaseItemProps | null>(null)

const takeRecord = (val: any) => (typeof val === 'function' ? val() : val)

const useArray = () => {
  return useContext(ArrayBaseContext)
}

const useIndex = (index?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.index : index
}

const useRecord = (record?: number) => {
  const ctx = useContext(ItemContext)
  return takeRecord(ctx ? ctx.record : record)
}

export const ArrayBase: ComposedArrayBase = (props) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  return (
    <RecordsScope getRecords={() => field.value}>
      <ArrayBaseContext.Provider value={{ field, schema, props }}>
        {props.children}
      </ArrayBaseContext.Provider>
    </RecordsScope>
  )
}

ArrayBase.Item = ({ children, ...props }) => {
  return (
    <ItemContext.Provider value={props}>
      <RecordScope
        getIndex={() => props.index}
        getRecord={() => takeRecord(props.record)}
      >
        {children}
      </RecordScope>
    </ItemContext.Provider>
  )
}

ArrayBase.useArray = useArray
ArrayBase.useIndex = useIndex
ArrayBase.useRecord = useRecord
ArrayBase.mixin = (target: any) => {
  target.useArray = ArrayBase.useArray
  target.useIndex = ArrayBase.useIndex
  target.useRecord = ArrayBase.useRecord
  return target
}

export default ArrayBase
