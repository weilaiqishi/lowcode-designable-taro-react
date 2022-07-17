import { ImageModeSelect } from '../components/shared'

export const RadioGroup = {
  'zh-CN': {
    title: '单选框组',
    settings: {
      'x-component-props': {
        style: {
          customIcon: {
            title: '自定义图标',
            useIcon: '使用自定义图标',
            srcActive: '选中图片链接',
            srcInactive: '未选中图片链接',
            width: '图片宽度',
            height: '图片高度',
            ...ImageModeSelect.locales,
          },
          radioFontSize: 'font-size',
          radioBorderColor: 'border-color',
          radioGap: 'gap',
          radioLabelMargin: 'label-margin',
          radioLabelColor: 'label-color',
          radioLabelLineHeight: 'label-line-height',
          radioDisabledLabelColor: 'disabled-label-color',
          radioIconFontSize: 'icon-font-size',
          radioCheckedIconColor: 'checked-icon-color',
          radioCheckedIconBorderColor: 'checked-icon-border-color',
          radioCheckedIconBackgroundColor: 'checked-icon-background-color',
          radioDisabledIconColor: 'disabled-icon-color',
          radioDisabledIconBorderColor: 'disabled-icon-color'
        },
        direction: '排列方向',
        size: '图标大小',
        shape: '形状',
      },
    },
  },
}
