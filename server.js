const jsonServer = require('json-server');
const path = require('path'); // Importante para rutas en la nube
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // Ruta absoluta
const middlewares = jsonServer.defaults();

// Render usa puertos aleatorios, el 10000 es el backup común
const port = process.env.PORT || 10000;

server.use(middlewares);
server.use(router);

// Agregamos '0.0.0.0' para que Render pueda encontrar el proceso
server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server está funcionando en el puerto ${port}`);
});