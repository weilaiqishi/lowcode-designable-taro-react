import { GlobalRegistry } from '@/designable/designable-core/src'
import zhCN from './zh-CN'
import enUS from './en-US'
import koKR from './ko-KR'

GlobalRegistry.registerDesignerLocales(zhCN, enUS, koKR)
