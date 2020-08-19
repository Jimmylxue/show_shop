module.exports = {
  publicPath: '/',
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:666',
        // target: 'http://39.96.42.170/:666',
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
