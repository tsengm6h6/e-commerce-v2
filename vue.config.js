module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/e-commerce-v2/'
    : '/'
  productionSourceMap: false,
  // process.env.NODE_ENV !== 'production', // production 時為 false
  chainWebpack: config => {
    // ============壓縮圖片 start============
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
    // ============壓縮圖片 end============
  }
}
