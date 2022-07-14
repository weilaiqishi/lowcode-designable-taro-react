import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import child_process from 'child_process'
import NodePath from 'path'
import RollupCopy from 'rollup-plugin-copy'
import RollupTypescript from 'rollup-plugin-typescript2'

import Package from '../package.json'

const resolveFile = (path) => NodePath.resolve(__dirname, '..', path)

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react',
  '@formily/core',
  '@formily/react',
  '@frmily/shared',
  '@formily/json-schema',
  '@taroify/core',
  '@kimeng/vm',
]

function pluginCopy() {
  const name = 'copyStyle'
  return {
    name: name,
    generateBundle() {
      child_process.exec('node copy.mjs')
    },
  }
}
export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: true,
    },
  ],
  external: externalPackages,
  plugins: [
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    RollupCommonjs({
      include: /\/node_modules\//,
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json'),
    }),
    pluginCopy(),
  ],
}
