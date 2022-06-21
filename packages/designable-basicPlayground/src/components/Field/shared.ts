import {
  DataSourceSetter,
  ReactionsSetter,
  ValidatorSetter,
} from '@designable/formily-setters'
import { ISchema } from '@formily/json-schema'
import * as lodash from 'lodash-es'

import { FormItemSwitcher } from '../../common/FormItemSwitcher'
import { AllSchemas } from '../../schemas'

const getAllSchemaProperties = (props, index) => {
  const style
    = props?.[index]
      ? {
        type: AllSchemas.CSSStyle.type,
        properties: lodash.pick(lodash.cloneDeep(AllSchemas.CSSStyle.properties), props[index])
      } : lodash.cloneDeep(AllSchemas.CSSStyle)
  return style
}

export const createComponentSchema = (
  component: ISchema,
  decorator: ISchema,
  props: any
) => {
  const xComponentPropsStyle = getAllSchemaProperties(props, 'x-component-props.style')
  const xDecoratorPropsStyle = getAllSchemaProperties(props, 'x-decorator-props.style')

  return {
    'component-group': component && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props': component,
      },
    },
    'decorator-group': decorator && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      properties: {
        'x-decorator-props': decorator,
      },
    },
    'component-style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props.style': xComponentPropsStyle,
      },
    },
    'decorator-style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      properties: {
        'x-decorator-props.style': xDecoratorPropsStyle,
      },
    },
  }
}

export const createFieldSchema = ({
  component,
  props = {},
  decorator = AllSchemas.FormItem
}: {
  component: ISchema,
  props?: any,
  decorator?: ISchema
}): ISchema => {
  const defaultFieldGroupProperties = {
    name: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        "dependencies": [
          {
            "property": "value",
            "type": "any"
          }
        ],
        fulfill: {
          state: {
            // hidden: '{{(console.log($form.values)) && true}}',
            hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
          },
        },
      },
    },
    description: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-reactions': {
        "dependencies": [
          {
            "property": "value",
            "type": "any"
          }
        ],
        fulfill: {
          state: {
            // hidden: '{{(console.log($form.values)) && true}}',
            hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
          },
        },
      },
    },
    'x-display': {
      type: 'string',
      enum: ['visible', 'hidden', 'none', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'visible',
      },
    },
    'x-pattern': {
      type: 'string',
      enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'editable',
      },
    },
    default: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
    },
    enum: {
      'x-decorator': 'FormItem',
      'x-component': DataSourceSetter,
    },
    'x-reactions': {
      'x-decorator': 'FormItem',
      'x-component': ReactionsSetter,
    },
    'x-validator': {
      type: 'array',
      'x-component': ValidatorSetter,
    },
    required: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'x-decorator': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': FormItemSwitcher,
      'x-reactions': {
        "dependencies": [
          {
            "property": "value",
            "type": "any"
          }
        ],
        fulfill: {
          state: {
            value: '{{$form.values["x-component-props"]["style"]["position"] !== "absolute" ? "FormItem" : ""}}',
          },
        },
      },
    },
  }

  const fieldGroupProperties
    = props?.['field-group']
      ? lodash.pick(defaultFieldGroupProperties, props['field-group'])
      : defaultFieldGroupProperties

  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: fieldGroupProperties,
      },
      ...createComponentSchema(component, decorator, props),
    },
  }
}

export const createVoidFieldSchema = ({
  component,
  props = {},
  decorator = AllSchemas.FormItem
}: {
  component: ISchema,
  props?: any,
  decorator?: ISchema
}) => {
  const defaultFieldGroupProperties = {
    name: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        fulfill: {
          state: {
            hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
          },
        },
      },
    },
    description: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-reactions': {
        fulfill: {
          state: {
            hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
          },
        },
      },
    },
    'x-display': {
      type: 'string',
      enum: ['visible', 'hidden', 'none', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'visible',
      },
    },
    'x-pattern': {
      type: 'string',
      enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'editable',
      },
    },
    'x-reactions': {
      'x-decorator': 'FormItem',
      'x-component': ReactionsSetter,
    },
    'x-decorator': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': FormItemSwitcher,
    },
  }
  const fieldGroupProperties
    = props?.['field-group']
      ? lodash.pick(defaultFieldGroupProperties, props['field-group'])
      : defaultFieldGroupProperties

  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: fieldGroupProperties,
      },
      ...createComponentSchema(component, decorator, props),
    },
  }
}