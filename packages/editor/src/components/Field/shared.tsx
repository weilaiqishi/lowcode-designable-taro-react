import { ISchema } from '@formily/json-schema'
import * as lodash from 'lodash-es'

import {
  DataSourceSetter,
  ReactionsSetter,
  ValidatorSetter,
} from '@/designable/designable-formily-setters/src'

import { FormItemSwitcher } from '../../common/FormItemSwitcher'
import { AllSchemas } from '../../schemas'

const eventProps = {
  api: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    enum: [
      { label: '自定义JS语句执行', value: 'runStatement' },
      { label: 'Taro界面交互showToast', value: 'Taro.showToast' },
      { label: 'Taro界面交互showModal', value: 'Taro.showModal' },
      { label: 'formily表单修改values', value: '$form.setValues' },
      // { label: 'formily字段', value: '$self' }
    ],
  },
  path: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  propsOperatorsArrayTitle: {
    type: 'string',
    'x-decorator': 'FormItem',
    title: '参数表达式数组',
  },
  propsOperatorsArray: {
    type: 'array',
    'x-component': 'ArrayItems',
    items: {
      type: 'void',
      'x-component': 'Space',
      properties: {
        input: {
          type: 'string',
          'x-component': 'Input.TextArea',
        },
        remove: {
          type: 'void',
          'x-component': 'ArrayItems.Remove',
        },
      },
    },
    properties: {
      add: {
        type: 'void',
        title: '添加条目',
        'x-component': 'ArrayItems.Addition',
      },
    },
  },
}
const xEventProperties = {
  click: {
    type: 'object',
    'x-component': 'DrawerSetter',
    'x-decorator': 'FormItem',
    'x-decorator-props': {
      labelStyle: {
        display: 'none',
      },
    },
    properties: {
      ...eventProps,
    },
  },
  close: {
    type: 'object',
    'x-component': 'DrawerSetter',
    'x-decorator': 'FormItem',
    'x-decorator-props': {
      labelStyle: {
        display: 'none',
      },
    },
    properties: {
      ...eventProps,
    },
  },
}

export const createComponentSchema = (
  component: ISchema,
  decorator: ISchema,
  props: any
) => {
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
        'x-component-props': {
          ...component,
          properties: props?.['component-group']
            ? lodash.pick(component.properties, props['component-group'])
            : component.properties,
        },
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
        'x-component-props.style': lodash.cloneDeep(AllSchemas.CSSStyle),
      },
    },
    'component-events-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      properties: {
        'x-component-props.event': {
          type: 'object',
          properties: props?.['component-events-group']
            ? lodash.pick(xEventProperties, props['component-events-group'])
            : xEventProperties,
        },
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
        'x-decorator-props.style': lodash.cloneDeep(AllSchemas.CSSStyle),
      },
    },

  }
}

const FormItemProperties: ISchema = {
  type: 'object',
  properties: {
    errorMessageAlign: {
      type: 'string',
      enum: ['center' , 'right' , 'left'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'left',
      },
    },
    starPosition: {
      type: 'string',
      enum: ['left', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'left',
      },
    },
  },
}


export const createFieldSchema = ({
  component,
  props = {},
  decorator = FormItemProperties,
}: {
  component: ISchema
  props?: any
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
        dependencies: [
          {
            property: 'value',
            type: 'any',
          },
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
        dependencies: [
          {
            property: 'value',
            type: 'any',
          },
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
    },
  }

  const fieldGroupProperties = props?.['field-group']
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
  decorator = FormItemProperties,
}: {
  component: ISchema
  props?: any
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
  const fieldGroupProperties = props?.['field-group']
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
