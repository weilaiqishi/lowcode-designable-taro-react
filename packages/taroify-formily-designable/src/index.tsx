//import { Sandbox } from '@pind/designable-react-sandbox'
import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { GithubOutlined } from '@ant-design/icons'
import {
  createBehavior,
  createDesigner,
  createResource,
  GlobalRegistry,
} from '@pind/designable-core'
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  IconWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  useDesigner,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workbench,
  WorkspacePanel,
} from '@pind/designable-react'
import {
  MonacoInput,
  setNpmCDNRegistry,
  SettingsForm,
} from '@pind/designable-react-settings-form'
import { observer } from '@formily/react'
import { defineCustomElements } from '@tarojs/components/dist/esm/loader.js'
import Taro from '@tarojs/taro'
import { Button as AntdButton, message, Space } from 'antd'
import { formilyStoreRegister } from 'taroify-formily'

import testJson from '../../taroify-formily-demo/src/pages/index/event.json'
import todoList from '../../taroify-formily-demo/src/pages/index/todoList.json'
import {
  ArrayViews,
  Button,
  Checkbox,
  Field,
  Form,
  Image,
  Input,
  Radio,
  Rate,
  Slider,
  Stepper,
  Switch,
  Text,
  WidgetBase,
  WidgetCell,
  WidgetCellGroup,
  WidgetList,
  WidgetPopup,
} from '../src/components/index'

import { loadInitialSchema, saveSchema } from './service'
import { PreviewWidget, SchemaEditorWidget } from './widgets'

import '@tarojs/components/dist/taro-components/taro-components.css'
import '@taroify/icons/index.scss'
import '@taroify/core/index.scss'
import 'taroify-formily/src/style/index.scss'
import './taroifyFix.scss'

defineCustomElements(window)
setNpmCDNRegistry('//unpkg.com')
GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
      Marketings: '营销活动组件',
    },
  },
})

// 注册formily自定义组件全局数据源
formilyStoreRegister({
  Taro: {
    ...Taro,
    // 注册一些 PC Taro上没有的方法
    showToast(arg) {
      const { title = '', duration = 2 } = arg || {}
      message.info('(PC临时工)' + title, duration)
      // {"title": JSON.stringify($form.values)}
    },
    showModal(arg) {
      const { content = '', duration = 2 } = arg || {}
      message.info('(PC临时工)' + content, duration)
    },
  }
})

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
    <IconWidget
      infer="Logo"
      style={{ margin: 10, height: 24, width: 'auto' }}
    />
  </div>
)

const Actions = observer(() => {
  const designer = useDesigner()

  return (
    <Space style={{ marginRight: 10 }}>
      <AntdButton
        type="primary"
        onClick={() => {
          loadInitialSchema(designer, JSON.stringify(todoList))
        }}
      >
        使用TODOLIST配置
      </AntdButton>
      <AntdButton
        type="primary"
        onClick={() => {
          loadInitialSchema(designer, JSON.stringify(testJson))
        }}
      >
        使用默认配置
      </AntdButton>
      <AntdButton
        type="primary"
        onClick={() => {
          const otherWindow = window.open(process.env.demoPath)
          const fn = (event) => {
            if (event.data.type === 'getSchema') {
              // window.removeEventListener('message', fn)
              otherWindow.postMessage(
                {
                  type: 'getSchemaRes',
                  data: saveSchema(designer),
                },
                process.env.demoPath
              )
            }
          }
          window.addEventListener('message', fn, false)
        }}
      >
        预览
      </AntdButton>
    </Space>
  )
})

const App = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        rootComponentName: 'Form',
      }),
    []
  )

  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel logo={<Logo />} actions={<Actions />}>
          <CompositePanel>
            <CompositePanel.Item title="panels.Component" icon="Component">
              <ResourceWidget
                title="sources.Inputs"
                sources={[
                  Input,
                  Checkbox,
                  Radio,
                  Rate,
                  Slider,
                  Stepper,
                  Switch,
                ]}
              />
              <ResourceWidget
                title="sources.Displays"
                sources={[Button, Image, Text]}
              />
              <ResourceWidget title="sources.Arrays" sources={[ArrayViews]} />
              <ResourceWidget
                title="sources.Layouts"
                sources={[
                  WidgetBase,
                  WidgetCell,
                  WidgetCellGroup,
                  WidgetList,
                  WidgetPopup,
                ]}
              />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']} />
            </ToolbarPanel>
            <ViewportPanel
              style={{
                minHeight: '100%',
                width: '750px',
                overflow: 'auto',
              }}
            >
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    className="ComponentTreeWidget"
                    components={{
                      ArrayViews,
                      Button,
                      Checkbox,
                      Form,
                      Field,
                      Image,
                      Input,
                      Radio,
                      Rate,
                      Slider,
                      Stepper,
                      Switch,
                      Text,
                      WidgetBase,
                      WidgetCell,
                      WidgetCellGroup,
                      WidgetList,
                      WidgetPopup,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
} else {
  console.error('dom root is non-existent')
}
