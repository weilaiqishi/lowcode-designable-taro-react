import { Engine } from '@/designable/designable-core/src'
import {
  transformToSchema,
  transformToTreeNode,
} from '@/designable/designable-formily-transformer/src'

export const saveSchema = (designer: Engine) => {
  return JSON.stringify(transformToSchema(designer.getCurrentTree(), {
    designableFormName: 'FormPage'
  }))
}

export const loadInitialSchema = (designer: Engine, json) => {
  try {
    designer.setCurrentTree(transformToTreeNode(JSON.parse(json), {
      designableFormName: 'FormPage'
    }))
  } catch (err) {
    console.log(err)
  }
}
