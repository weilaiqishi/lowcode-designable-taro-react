import React from 'react'
import * as Icons from '@nutui/icons-react-taro'
import { Select } from 'antd'
import * as lodash from 'lodash-es'

import * as AllSchemas from '../schemas/all'

export const IconSelect = {
  type: 'string',
  'x-decorator': 'FormItem',
  'x-component': ({ value, onChange }) => {
    return (
      <Select
        value={value}
        onChange={onChange}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          String(option!.value).toLowerCase().includes(input.toLowerCase())
        }
      >
        {Object.keys(Icons).map((key) => {
          const Icon = Icons[key]
          return (
            <Select.Option value={key}>
              <Icon style={{ fontSize: 20 }}></Icon>
            </Select.Option>
          )
        })}
      </Select>
    )
  },
}

console.log(AllSchemas)

export const imageDesignableConfig = {
  locales: {
    mode: '图片模式',
  },
  properties: {
    src: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    mode: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        'scaleToFill',
        'aspectFit',
        'aspectFill',
        'widthFix',
        'heightFix',
        'top',
        'bottom',
        'center',
        'left',
        'right',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
      ],
      default: 'aspectFit',
    },
    lazyLoad: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    width: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    height: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    radius: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    'style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      properties: {
        style: lodash.cloneDeep(AllSchemas.CSSStyle),
      },
    },
  },
}

export const iconFontDesignableConfig = {
  properties: {
    name: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': IconSelect,
    },
    size: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    // width: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'SizeInput'
    // },
    // height: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'SizeInput'
    // },
    color: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ColorInput',
    },
    classPrefix: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    fontClassName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    // tag: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    'style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      properties: {
        style: lodash.cloneDeep(AllSchemas.CSSStyle),
      },
    },
  },
}

export function iconimageDesignableConfig() {
  return {
    type: 'object',
    'x-component': 'DrawerSetter',
    properties: {
      imageProps: {
        type: 'object',
        'x-component': 'CollapseItem',
        properties: lodash.cloneDeep(imageDesignableConfig),
      },
      iconFontProps: {
        type: 'object',
        'x-component': 'CollapseItem',
        properties: lodash.cloneDeep(iconFontDesignableConfig),
      },
    },
  }
}
