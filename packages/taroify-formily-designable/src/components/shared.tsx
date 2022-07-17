import React from 'react'
import * as Icons from '@taroify/icons'
import { Select } from 'antd'

export const ImageModeSelect = {
  locales: {
    mode: '图片模式',
  },
  properties: {
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
  },
}

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
