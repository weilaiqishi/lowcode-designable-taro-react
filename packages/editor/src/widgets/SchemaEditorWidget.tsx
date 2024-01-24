import React from 'react'
import { ITreeNode, TreeNode } from '@pind/designable-core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@pind/designable-formily-transformer'

import { MonacoInput } from '@/designable/designable-react-settings-form/src'

export interface ISchemaEditorWidgetProps {
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  return (
    <MonacoInput
      {...props}
      value={JSON.stringify(
        transformToSchema(props.tree, {
          designableFormName: 'FormPage',
        }),
        null,
        2
      )}
      onChange={(value) => {
        props.onChange?.(
          transformToTreeNode(JSON.parse(value), {
            designableFormName: 'FormPage',
          })
        )
      }}
      language="json"
    />
  )
}
