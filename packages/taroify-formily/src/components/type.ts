import { CSSProperties } from 'react'
import { FieldDataSource } from '@formily/core/lib/types'

export type typePropsBase = {
  children?: React.ReactNode
  style?: CSSProperties
  'data-designer-node-id'?: string
}

export type typePropsFields = typePropsBase & {
  value: any
  onChange: any
  disabled?: boolean
  dataSource?: FieldDataSource
}