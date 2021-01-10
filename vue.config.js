module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        // '@':'src',
        'components': '@/components',
        'assets': '@/assets',
        'network': '@/network',
        'router': '@/router',
        'store': '@/store',
        'views': '@/views',
      }
    }
  },
  // css: {
  //   loaderOptions: { // 向 CSS 相关的 loader 传递选项
  //     less: {
  //       javascriptEnabled: true
  //     }
  //   }
  // },

  // publicPath: './',
  //
  //
  // devServer: {
  //     https:false,
  //     // proxy:'http://localhost:8000',
  //     // changeOrigin: true,  //是否跨域
  //     proxy: {
  //       '/api/*': {
  //         // target:process.env.VUE_APP_HOST,  // 接口域名
  //         // ws: true, //是否跨域
  //         // secure: false,  // 如果是https接口，需要配置这个参数
  //         changeOrigin: true,  //是否跨域
  //         pathRewrite: {
  //           '^/api/*': ''   //需要rewrite的,
  //         }
  //       }
  //     }
  //   }


}
