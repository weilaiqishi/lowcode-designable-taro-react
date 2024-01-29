import { createLocales } from '@/designable/designable-core/src'
import { Input } from './Input'

export const Password = createLocales(Input, {
  'zh-CN': {
    title: '密码输入',
  },
  'en-US': {
    title: 'Password',
  },
  'ko-KR': {
    title: '비밀번호',
  },
})
