// server.js

const express = require('express');
const autorController = require('./autorController');
const path = require('path'); // Importar el módulo path

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// 💡 LÍNEA CLAVE 1: Configurar Express para servir archivos estáticos (HTML, CSS, JS)
// Esto mapea la carpeta 'public' a la raíz del servidor '/'
app.use(express.static(path.join(__dirname, 'public')));

// 💡 LÍNEA CLAVE 2: Definir la ruta raíz para servir el archivo principal
// Cuando alguien acceda a http://localhost:3000/, servirá el archivo autor_crud.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ----------------------
// ENDPOINTS DE LA API (CRUD)
// ----------------------

// C: CREATE - Crear un nuevo autor
// POST http://localhost:3000/api/autores
app.post('/api/autores', autorController.crearAutor);

// R: READ - Obtener todos los autores
// GET http://localhost:3000/api/autores
app.get('/api/autores', autorController.obtenerAutores);

// R: READ - Obtener un autor por ID
// GET http://localhost:3000/api/autores/123
app.get('/api/autores/:id', autorController.obtenerAutorPorId);

// U: UPDATE - Actualizar un autor por ID
// PUT http://localhost:3000/api/autores/123
app.put('/api/autores/:id', autorController.actualizarAutor);

// D: DELETE - Eliminar un autor por ID
// DELETE http://localhost:3000/api/autores/123
app.delete('/api/autores/:id', autorController.eliminarAutor);

// Inicializar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API REST escuchando en http://localhost:${PORT}`);
});