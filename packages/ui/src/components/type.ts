import { CSSProperties } from 'react'
import { FieldDataSource } from '@formily/core/lib/types'

export type typePropsBase = {
  id?: string
  children?: React.ReactNode
  className?: string
  style?: CSSProperties
  'data-designer-node-id'?: string
}

export type typePropsFields = typePropsBase & {
  value: any
  onChange: any
  dataSource?: FieldDataSource
  disabled?: boolean
  readOnly?: boolean
}

export const ComponentDefaults = {
  className: '',
  style: {},
}