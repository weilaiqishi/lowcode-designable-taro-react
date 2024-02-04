const path = require('path')

const config = {
  projectName: 'formily',
  date: '2022-5-30',
  designWidth: 750,
  deviceRatio: {
    750: 1,
  },
  baseFontSize: 37.5,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
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
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
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
    commonChunks: ['runtime', 'vendors', 'taro', 'common', 'vm'],
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
      autoprefixer: {
        enable: true,
        config: {
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
    esnextModules: ["@taroify"]
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
