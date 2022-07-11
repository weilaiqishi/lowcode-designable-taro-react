import { ImageModeSelect } from '../components/Field/shared'

export const CheckboxGroup = {
  'zh-CN': {
    title: '复选框组',
    settings: {
      'x-component-props': {
        style: {
          checkboxFontSize: 'font-size',
          checkboxBorderColor: 'border-color',
          checkboxGap: 'gap',
          checkboxLabelMargin: 'label-margin',
          checkboxLabelColor: 'label-color',
          checkboxLabelLineHeight: 'label-line-height',
          checkboxDisabledLabelColor: 'disabled-label-color',
          customIcon: {
            title: '自定义图标',
            useIcon: '使用自定义图标',
            srcActive: '选中图标链接',
            srcInactive: '未选中图标链接',
            width: '图标宽度',
            height: '图标高度',
            ...ImageModeSelect.locales,
          },
        },
        max: '最大可选数',
        direction: '排列方向',
        size: '图标大小',
        shape: '形状',
      },
    },
  },
}
