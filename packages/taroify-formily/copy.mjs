import fes from 'fs-extra'
import path from 'path'

const styleSrc = './src/style'
const styleDist = './dist'


function copy () {
  const list = fes.readdirSync(path.resolve(styleSrc))
  list.forEach(item => {
    fes.copy(path.resolve(styleSrc, item), path.resolve(styleDist, item), {
      overwrite: true
    }) 
  })

}

copy()
