import { Schema } from '@formily/json-schema'
import {
  createSchemaField
} from '@formily/react'

import {
  FormItem,
  Input,
  InputNumber,
  Rate,
  Switch
} from './index'

export const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    InputNumber,
    Rate,
    Switch
  },
})