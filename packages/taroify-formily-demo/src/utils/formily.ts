import {
  registerValidateLocale,
  registerValidateRules,
  setValidateLanguage,
} from '@formily/core'
import Taro from '@tarojs/taro'
import { formilyCompilerInMiniRegister, formilyStoreRegister } from 'taroify-formily/src'

export function initFormily() {
  if (process.env.TARO_ENV !== 'h5') {
    // json-schema注册兼容小程序的解析器
    formilyCompilerInMiniRegister()
  } else {
    // json-schema注册兼容小程序的解析器 在h5环境中测试
    formilyCompilerInMiniRegister()

    // 注册formily自定义组件全局数据源
    // 补充部分h5缺失的Taro方法
    formilyStoreRegister({
      Taro: {
        ...Taro,
        // 注册一些 PC Taro上没有的方法
        showToast(arg) {
          const { title = '', duration = 2 } = arg || {}
          alert(title)
        },
        showModal(arg) {
          const { content = '', duration = 2 } = arg || {}
          alert(content)
        },
      },
    })
  }

  // 组件初始化

  // 校验文案初始化
  registerValidateRules({
    noBr(value) {
      return value.includes('\n') ? '不支持换行' : ''
    },
  })

  // 国际化初始化
  setValidateLanguage('zh-CN')
  registerValidateLocale({
    'zh-CN': {
      // required: '定制的必填校验文案',
    },
  })
}