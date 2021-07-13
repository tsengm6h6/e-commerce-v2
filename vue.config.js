// 程式碼壓縮
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/e-commerce-v2/'
    : '/',
  productionSourceMap: process.env.NODE_ENV !== 'production',

  chainWebpack: config => {
    // 壓縮圖片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 修改預設語言
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/, 'element-ui/lib/locale/lang/zh-TW')
      )
      // 程式碼壓縮
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生產環境自動刪除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  }
}
