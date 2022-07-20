import { createSchemaField } from '@formily/react'

import {
  Button,
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
  WidgetCellGroup,
  WidgetPopup,
} from './index'

export const SchemaField = createSchemaField({
  components: {
    Button,
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
    WidgetCellGroup,
    WidgetPopup,
  },
})
