import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'

export const saveSchema = (designer: Engine) => {
  return JSON.stringify(transformToSchema(designer.getCurrentTree()))
}

export const loadInitialSchema = (designer: Engine, json) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(json))
    )
  } catch (err) {
    console.log(err)
  }
}
