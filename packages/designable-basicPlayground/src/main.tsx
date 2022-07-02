//import { Sandbox } from '@designable/react-sandbox'
import React, { Suspense, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { GithubOutlined } from '@ant-design/icons'
import {
  createBehavior,
  createDesigner,
  createResource,
  GlobalRegistry,
} from '@designable/core'
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
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workbench,
  WorkspacePanel,
} from '@designable/react'
import {
  MonacoInput,
  setNpmCDNRegistry,
  SettingsForm,
} from '@designable/react-settings-form'
import { observer } from '@formily/react'
import { defineCustomElements } from '@tarojs/components/dist/esm/loader.js'
import { Button, Radio, Space } from 'antd'

import 'antd/dist/antd.less'

import { Field, Form, Input, InputNumber, Rate, Switch, WidgetBase } from '../src/components/index'

import { PreviewWidget, SchemaEditorWidget } from './widgets'

import '@tarojs/components/dist/taro-components/taro-components.css'
import 'taro-ui/dist/style/index.scss'
import 'formily-taro-ui/dist/index.scss'

defineCustomElements()
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

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
    <IconWidget
      infer='Logo'
      style={{ margin: 10, height: 24, width: 'auto' }}
    />
  </div>
)

const Actions = observer(() => {
  useEffect(() => {}, [])

  return (
    <Space style={{ marginRight: 10 }}>
      <Button>保存</Button>
      <Button type='primary'>发布</Button>
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
            <CompositePanel.Item title='panels.Component' icon='Component'>
              <ResourceWidget title='sources.Inputs' sources={[Input, InputNumber, Rate, Switch]} />
              <ResourceWidget title='sources.Displays' sources={[]} />
              <ResourceWidget title="sources.Layouts" sources={[WidgetBase]} />
            </CompositePanel.Item>
            <CompositePanel.Item title='panels.OutlinedTree' icon='Outline'>
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item title='panels.History' icon='History'>
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']} />
            </ToolbarPanel>
            <ViewportPanel
              style={{ minHeight: '100%', width: '750px', overflow: 'auto' }}
            >
              <ViewPanel type='DESIGNABLE'>
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      InputNumber,
                      Rate,
                      Switch,
                      WidgetBase
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type='JSONTREE' scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type='PREVIEW'>
                {(tree) => <PreviewWidget tree={tree}/>}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title='panels.PropertySettings'>
            <SettingsForm uploadAction='https://www.mocky.io/v2/5cc8019d300000980a055e76' />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
