const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // paste the AWS EC2 endpoint url here
      target: 'http://ec2-3-101-78-195.us-west-1.compute.amazonaws.com:5075/',
      changeOrigin: true,
    })
  );
};