// autorController.js (versión Postgres)
const pool = require('./db');

// Crear autor
async function crearAutor(req, res) {
  try {
    const { nombre, nacionalidad } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const { rows } = await pool.query(
      'INSERT INTO autor (nombre, nacionalidad) VALUES ($1, $2) RETURNING *',
      [nombre, nacionalidad || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('crearAutor error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}

// Listar autores
async function listarAutores(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT id, nombre, nacionalidad, fecha_creacion FROM autor ORDER BY id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('listarAutores error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}

// Actualizar autor
async function actualizarAutor(req, res) {
  try {
    const { id } = req.params;
    const { nombre, nacionalidad } = req.body;

    const { rowCount, rows } = await pool.query(
      'UPDATE autor SET nombre=$1, nacionalidad=$2 WHERE id=$3 RETURNING *',
      [nombre, nacionalidad || null, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('actualizarAutor error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}

// Eliminar autor
async function eliminarAutor(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM autor WHERE id=$1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json({ ok: true });
  } catch (err) {
    console.error('eliminarAutor error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}

module.exports = { crearAutor, listarAutores, actualizarAutor, eliminarAutor };
