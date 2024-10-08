const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://17f4-2a02-908-2540-80e0-6807-36b1-211b-4c31.ngrok-free.app/api',
      changeOrigin: true,
      followRedirects: true
    })
  );
};