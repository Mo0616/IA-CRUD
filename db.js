// db.js  (PostgreSQL en Render)
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // pega la Internal Database URL en Render
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined
});

// crea la tabla si no existe
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS autor (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        nacionalidad VARCHAR(50),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla autor verificada/creada');
  } catch (e) {
    console.error('Error creando tabla autor:', e);
  }
})();

module.exports = pool;
