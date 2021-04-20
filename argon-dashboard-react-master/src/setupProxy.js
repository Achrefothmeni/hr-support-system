const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/get-mp3',
    createProxyMiddleware({
      target: 'http://localhost:8888',
      changeOrigin: true,
    })
  )
  app.use(
    [
      '/me',
      '/admin/users',
      '/admin/user',
      '/hrs',
      '/remove-hr/',
      '/add-hr',
      '/ban-hr/',
      '/unban-hr/',
      '/register',
      '/login',
      '/password/forgot',
      '/password/reset',
      '/logout',
      '/password/update',
      '/me/update',
      '/email',
      '/schedule',
      '/meets',
      '/api/settings',
      '/api/profiles',
      '/api/settings/add',
    ],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  )
}
