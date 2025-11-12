// autorController.js — versión PostgreSQL, nombres compatibles con tu server.js
const pool = require('./db');

// C: Crear un autor
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

// R: Obtener todos
async function obtenerAutores(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT id, nombre, nacionalidad, fecha_creacion FROM autor ORDER BY id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('obtenerAutores error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}

// R: Obtener por ID
async function obtenerAutorPorId(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT id, nombre, nacionalidad, fecha_creacion FROM autor WHERE id=$1',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('obtenerAutorPorId error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}

// U: Actualizar
async function actualizarAutor(req, res) {
  try {
    const { id } = req.params;
    const { nombre, nacionalidad } = req.body;

    const { rows, rowCount } = await pool.query(
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

// D: Eliminar
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

module.exports = {
  crearAutor,
  obtenerAutores,
  obtenerAutorPorId,
  actualizarAutor,
  eliminarAutor
};
