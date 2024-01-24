import { createSchemaField } from '@formily/react'

import { ArrayViews } from './ArrayViews'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { DatePicker } from './DatePicker'
import { Form } from './Form'
import { FormItem } from './FormItem'
import { Icon } from './Icon'
import { Image } from './Image'
import { Input } from './Input'
import { InputNumber } from './InputNumber'
import { Radio } from './Radio'
import { Range } from './Range'
import { Rate } from './Rate'
import { Switch } from './Switch'
import { Text } from './Text'
import { TextArea } from './TextArea'
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
    DatePicker,
    Form,
    FormItem,
    Icon,
    Image,
    Input,
    InputNumber,
    Radio,
    Range,
    Rate,
    Switch,
    Text,
    TextArea,
    WidgetBase,
    WidgetCell,
    WidgetCellGroup,
    WidgetList,
    WidgetPopup,
  },
})
