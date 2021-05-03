// 專案釋出階段需要用到的 babel 外掛
const prodPlugins = []
// 判斷編譯模式為生產環境
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodPlugins
  ]
}