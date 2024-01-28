import React from 'react'
import { ISchema } from '@formily/json-schema'
import * as Icons from '@nutui/icons-react-taro'
import { Select } from 'antd'
import * as lodash from 'lodash-es'

import { CSSStyleLocales } from '@/locales/Field'

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

export const imageDesignableConfig = {
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
    style: lodash.cloneDeep(AllSchemas.CSSStyle),
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

export function iconimageDesignableConfig(
  propertyArr: {
    name: string
    locale: string
  }[]
) {
  const obj = {
    imgsProperties: {} as Record<string, ISchema>,
    imgsLocales: {} as any,
  }
  propertyArr.forEach(({ name, locale }) => {
    obj.imgsProperties[name + '-group'] = {
      type: 'void',
      'x-component': 'DrawerSetter',
      properties: {
        [name + '.imageProps']: {
          type: 'object',
          'x-component': 'CollapseItem',
          properties: lodash.cloneDeep(imageDesignableConfig.properties),
          "x-component-props": {
            title: '图片'
          }
        },
        // iconFontProps: {
        //   type: 'object',
        //   'x-component': 'CollapseItem',
        //   properties: lodash.cloneDeep(iconFontDesignableConfig.properties),
        // },
      },
    }
    obj.imgsLocales[name + '-group'] = locale
    obj.imgsLocales[name] = {
      imageProps: {
        ...imageLocals,
        style: CSSStyleLocales,
      },
    }
  })
  return obj
}

const imageLocals = {
  src: '图片资源地址',
  mode: '图片裁剪、缩放的模式',
  lazyLoad: '图片懒加载',
  width: '宽度，默认单位px',
  height: '高度，默认单位px',
  radius: '圆角大小',
}
