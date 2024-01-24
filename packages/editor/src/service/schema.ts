import { Engine } from '@pind/designable-core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@pind/designable-formily-transformer'

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