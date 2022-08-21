const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://all-blog-server-dqgkyumivp.cn-hangzhou.fcapp.run',
      target:'http://127.0.0.1:7001',
      changeOrigin: true,
    })
  );
};