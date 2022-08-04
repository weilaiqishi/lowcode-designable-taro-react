/* eslint-disable max-nested-callbacks */
// https://juejin.cn/post/6974171023025389576

// eslint-disable-next-line no-undef
const inquirer = require('inquirer')
const promiseExeca = import('execa')

async function run () {
  const execa = await promiseExeca
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'action',
      message: '选择动作-Select Action',
      default: 'webpack-dev-server',
      choices: ['webpack-dev-server', 'webpack build']
    }
  ]).then((res) => {
    const { action } = res
    inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'demoPath',
          message: '选择demo预览地址-Select demo preview path',
          default: 'http://192.168.0.105:10086',
          choices: ['http://192.168.0.105:10086', 'https://miku01.cn/taroifyDemo/index.html']
        }
      ])
      .then(({ demoPath }) => {
        // eslint-disable-next-line no-undef
        console.log(action, demoPath)
        const actionMap = {
          'webpack-dev-server': 'webpack-dev-server --config config/webpack.dev.ts',
          'webpack build': 'npm run build'
        }
        // eslint-disable-next-line no-undef
        process.env.demoPath = demoPath
        const commands = [`${actionMap[action]}`]
        commands.forEach(item => {
          execa.execaCommandSync(item, {
            stdio: 'inherit'
          })
        })

      })
  })
}

run()