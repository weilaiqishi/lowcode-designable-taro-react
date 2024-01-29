import React from 'react'
import { ITreeNode, TreeNode } from '@/designable/designable-core/src'
import {
  transformToSchema,
  transformToTreeNode,
} from '@/designable/designable-formily-transformer/src'

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
