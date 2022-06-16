import { Schema } from '@formily/json-schema'
import {
  createSchemaField
} from '@formily/react'

import {
  FormItem,
  Input} from './index'

export const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem
  },
})