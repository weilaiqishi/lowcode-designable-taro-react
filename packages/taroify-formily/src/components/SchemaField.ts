import { createSchemaField } from '@formily/react'

import { ArrayViews } from './ArrayViews'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { DatetimePicker } from './DatetimePicker'
import { FormItem } from './FormItem'
import { Image } from './Image'
import { Input } from './Input'
import { Radio } from './Radio'
import { Rate } from './Rate'
import { Slider } from './Slider'
import { Stepper } from './Stepper'
import { Switch } from './Switch'
import { Text } from './Text'
import { WidgetBase } from './WidgetBase'
import { WidgetCell } from './WidgetCell'
import { WidgetCellGroup } from './WidgetCellGroup'
import { WidgetList } from './WidgetList'
import { WidgetPopup } from './WidgetPopup'

export const SchemaField = createSchemaField({
  components: {
    ArrayViews,
    Button,
    Checkbox,
    DatetimePicker,
    FormItem,
    Image,
    Input,
    Radio,
    Rate,
    Slider,
    Stepper,
    Switch,
    Text,
    WidgetBase,
    WidgetCell,
    WidgetCellGroup,
    WidgetList,
    WidgetPopup,
  },
})
