import { Schema } from '@formily/json-schema'
import { createSchemaField } from '@formily/react'

import {
  Button,
  CellGroup,
  Checkbox,
  DatetimePicker,
  FormItem,
  Input,
  Radio,
  Rate,
  Slider,
  Stepper,
  Switch,
  WidgetBase,
} from './index'

export const SchemaField = createSchemaField({
  components: {
    Button,
    CellGroup,
    Checkbox,
    DatetimePicker,
    FormItem,
    Input,
    Radio,
    Rate,
    Slider,
    Stepper,
    Switch,
    WidgetBase,
  },
})
