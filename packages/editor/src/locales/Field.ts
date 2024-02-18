const eventProps = {
  api: '预设api',
  path: '路径',
  propsOperatorsArray: '参数表达式数组'
}

export const CSSStyleLocales = {
  position: '定位',
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  width: '宽度',
  height: '高度',
  display: '展示',
  background: '背景',
  boxShadow: '阴影',
  font: '字体',
  margin: '外边距',
  padding: '内边距',
  borderRadius: '圆角',
  border: '边框',
  opacity: '透明度'
}

export const Field = {
  'zh-CN': {
    settings: {
      name: '字段标识',
      title: '标题',
      required: '必填',
      description: '描述',
      default: '默认值',
      enum: '可选项',
      'x-display': {
        title: '展示状态',
        tooltip: '半隐藏只会隐藏UI，全隐藏会删除数据',
        dataSource: ['显示', '半隐藏', '全隐藏', '继承'],
      },
      'x-pattern': {
        title: 'UI形态',
        dataSource: ['可编辑', '禁用', '只读', '阅读', '继承'],
      },
      'x-validator': '校验规则',
      'x-decorator': '容器组件',
      'x-reactions': '响应器规则',
      'field-group': '字段属性',
      'component-group': '组件属性',
      'decorator-group': '容器属性',
      'component-style-group': '组件样式',
      'component-events-group': '组件事件',
      'decorator-style-group': '容器样式',
      'x-component-props': {
        size: { title: '尺寸', dataSource: ['大', '小', '默认', '继承'] },
        allowClear: '允许清除内容',
        autoFocus: '自动获取焦点',
        showSearch: '支持搜索',
        notFoundContent: '空状态内容',
        bordered: '是否有边框',
        placeholder: '占位提示',
        style: CSSStyleLocales,
        event: {
          click: { title: '点击事件', ...eventProps },
          close: { title: '关闭事件', ...eventProps },
        }
      },
      'x-decorator-props': {
        // addonAfter: '后缀标签',
        // addonBefore: '前缀标签',
        // tooltip: '提示',
        // asterisk: '星号',
        // gridSpan: '网格跨列',
        // labelCol: '标签网格宽度',
        // wrapperCol: '组件网格宽度',
        // colon: '是否有冒号',
        // labelAlign: {
        //   title: '标签对齐',
        //   dataSource: ['左对齐', '居中', '右对齐'],
        // },
        // wrapperAlign: {
        //   title: '组件对齐',
        //   dataSource: ['左对齐', '居中', '右对齐'],
        // },
        // labelWrap: '标签换行',
        // wrapperWrap: '组件换行',
        // labelWidth: '标签宽度',
        // wrapperWidth: '组件宽度',
        // fullness: '组件占满',
        // inset: '内联布局',
        // shallow: '是否浅传递',
        // bordered: '是否有边框',
        // size: { title: '尺寸', dataSource: ['大', '小', '默认', '继承'] },
        // layout: { title: '布局', dataSource: ['垂直', '水平', '内联', '继承'] },
        // feedbackLayout: {
        //   title: '反馈布局',
        //   dataSource: ['宽松', '紧凑', '弹层', '无', '继承'],
        // },
        // tooltipLayout: {
        //   title: '提示布局',
        //   dataSource: ['图标', '文本', '继承'],
        // },
        errorMessageAlign: '错误提示文案',
        starPosition: '必填红色星标位置',
        style: CSSStyleLocales,
      },
    },
  }
}

