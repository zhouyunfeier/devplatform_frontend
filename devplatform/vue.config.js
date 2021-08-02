module.exports = {
    configureWebpack: {
      resolve: {
        //文件别名
        alias: {
          api: '@/api',
          assets: '@/assets',
          components: '@/components',
          layouts: '@/layouts',
          router: '@/router',
          store: '@/store',
          utils: '@/utils',
          views: '@/views'
        }
      }
    },
    devServer: {
      //端口
      port: 8081,
      //后端接口
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // 目标代理接口地址
          changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
          // ws: true, // 是否启用websockets
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
  