const skin = process.env.npm_config_skin || process.argv[2] || 'qq05'

const entry = {
  qq05: ['babel-polyfill', './src/skins/qq05/main.js'],
  a001: ['babel-polyfill', './src/skins/a001/main.js'],
  a002: ['babel-polyfill', './src/skins/a002/main.js'],
  a003: ['babel-polyfill', './src/skins/a003/main.js'],
  a004: ['babel-polyfill', './src/skins/a004/main.js'],
  a005: ['babel-polyfill', './src/skins/a005/main.js'],
  a006: ['babel-polyfill', './src/skins/a006/main.js'],
  common: './src/common-bundle/common.js'
}

if (!entry[skin]) {
  const availableSkins = Object.keys(entry).filter(key => key !== 'common')
  throw new Error(`Unknown skin "${skin}". Available skins: ${availableSkins.join(', ')}`)
}

for (const key in entry) {
  if (key !== skin && key !== 'common') delete entry[key]
}

module.exports = entry
