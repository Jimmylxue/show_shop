module.exports = {
  publicPath: '/',
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:666',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
}
