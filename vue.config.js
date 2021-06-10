// 程式碼壓縮
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/e-commerce-v2/'
    : '/',
  productionSourceMap: process.env.NODE_ENV !== 'production',

  chainWebpack: config => {
    // ============壓縮圖片 start============
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
    // ============壓縮圖片 end============
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 程式碼壓縮
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生產環境自動刪除console
            compress: {
              // warnings: false, // 若打包錯誤，則註釋這行
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
