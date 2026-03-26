const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 10000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rewrite rules for OpenAPI paths mappings
server.use(jsonServer.rewriter({
  '/api/users/me': '/me',
  '/api/*': '/$1'
}));

// Format the response according to the OpenAPI schema Wrapper structure
router.render = (req, res) => {
  // If the object already has a 'success' property, we avoid wrapping it again
  const responseData = res.locals.data;
  if (responseData && typeof responseData === 'object' && 'success' in responseData) {
    res.jsonp(responseData);
  } else {
    // Normal endpoints wrapping
    res.jsonp({
      success: res.statusCode >= 200 && res.statusCode < 400,
      data: responseData
    });
  }
};

server.use(router);

server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server está funcionando en el puerto ${port} (API en /api)`);
});