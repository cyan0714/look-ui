const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.10.28:7076',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: {
    optimization: {
      minimize: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(jpg|png|gif|svg)$/)
      .set('parser', {
        dataUrlCondition: {
          maxSize: 20 * 1024 // 20KB
        }
      })
  }
});
