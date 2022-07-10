import { Schema } from '@formily/json-schema'
import { createSchemaField } from '@formily/react'

import { CellGroup, FormItem, Input, WidgetBase } from './index'

export const SchemaField = createSchemaField({
  components: {
    CellGroup,
    FormItem,
    Input,
    WidgetBase,
  },
})
