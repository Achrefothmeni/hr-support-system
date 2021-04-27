const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/get-mp3',
    createProxyMiddleware({
      target: 'https://py-endp.herokuapp.com',
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
      '/password/reset/:token',
      '/password/forgot',
      '/admin/usersByName',
      '/logout',
      '/password/update',
      '/me/update',
      '/email',
      '/schedule',
      '/meets',
      '/api/settings',
      '/api/profiles',
      '/api/profile',
      '/api/settings/add',
      '/api/activity/add',
      
      '/api/activities'
    ],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  )
}
