import { observer } from '@formily/reactive-react'
import {
  IResource,
  IResourceLike,
  isResourceHost,
  isResourceList,
  SourceType,
} from '@pind/designable-core'
import { IResourceWidgetProps, ResourceWidget } from '../ResourceWidget'
import React from 'react'
import { isFn } from '@pind/designable-shared'
import { Input } from 'antd'

export interface IResourceListWidgetProps
  extends Omit<IResourceWidgetProps, 'title'> {
  sources?: IResourceLike[]
  expandSource?: SourceType[]
  onSearch?: (keyword: string) => boolean
}

export const ResourceListWidget: React.FC<IResourceListWidgetProps> = observer(
  ({ expandSource, sources, onSearch, ...props }) => {
    const sourceMap =
      sources?.reduce<Partial<Record<SourceType, IResource[]>>>(
        (buf, source) => {
          if (isResourceHost(source)) {
            source = source.Resource || []
          } else if (!isResourceList(source)) {
            return buf
          }
          source.forEach((item) => {
            const list = buf[item.type] || []
            buf[item.type] = list
            list.push(item)
          })
          return buf
        },
        {}
      ) || {}

    const renderList = () => {
      return Object.entries(sourceMap).map(([type, sources]) => {
        if (!sources?.length) return null
        return (
          <ResourceWidget
            key={type}
            {...props}
            title={`sources.${type}`}
            sources={[sources || []]}
            defaultExpand={expandSource?.includes(type) ?? props.defaultExpand}
          />
        )
      })
    }

    const renderSearch = () => {
      if (!isFn(onSearch)) return null
      return (
        <div className="search">
          <Input />
        </div>
      )
    }

    return (
      <>
        <div>{renderSearch()}</div>
        <div>{renderList()}</div>
      </>
    )
  }
)
