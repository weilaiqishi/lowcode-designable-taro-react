const path = require('path')

const config = {
  projectName: 'formily',
  date: '2024-2-05',
  designWidth (input) {
    // 配置 NutUI 375 尺寸
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375
    }
    // 全局使用 Taro 默认的 750 尺寸
    return 750
  },
  deviceRatio: {
    750: 1,
  },
  baseFontSize: 37.5,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false'
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false
    }
  },
  cache: {
    enable: false
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              customGroup: {
                test(module) {
                  return /@kimeng[\\/]vm/.test(module.resource)
                },
                name: 'vm',
                priority: 100,
              },
            },
          },
        },
      })
    },
    commonChunks: ['runtime', 'vendors', 'taro', 'common', 'vm']
  },
  h5: {
    staticDirectory: 'static',
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          /* pxtransform 配置项 */
          baseFontSize: 37.5,
          maxRootSize: 1000,
          minRootSize: 0
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    compile: {
      include: [(modulePath) => modulePath.includes('@kimeng/vm')]
    }
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
