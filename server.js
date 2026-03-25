const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Aquí conectamos con tus datos
const middlewares = jsonServer.defaults();

// Esto es vital para que funcione en la nube (Render/Railway)
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server está funcionando en http://localhost:${port}`);
});