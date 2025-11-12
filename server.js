const express = require('express');
const autorController = require('./autorController');
const path = require('path');
const cors = require('cors'); // ⭐ Instala con: npm install cors

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ IMPORTANTE: Habilitar CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ENDPOINTS DE LA API
app.post('/api/autores', autorController.crearAutor);
app.get('/api/autores', autorController.obtenerAutores);
app.get('/api/autores/:id', autorController.obtenerAutorPorId);
app.put('/api/autores/:id', autorController.actualizarAutor);
app.delete('/api/autores/:id', autorController.eliminarAutor);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});