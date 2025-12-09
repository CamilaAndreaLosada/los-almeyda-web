// server.js
// server.js - Deployment bump 2025-12-09 VERIFICACION-FINAL
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

// Importa las rutas de la API
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const pedidosRoutes = require('./routes/pedidos');
const categoriasRoutes = require('./routes/categorias');

// Configura los middlewares
app.use(cors());
app.use(bodyParser.json());

// Middleware de logging para ver todas las peticiones
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// =====================================================================================
// RUTAS DE LA API (DEBEN IR ANTES DE SERVIR ARCHIVOS ESTÁTICOS)
// =====================================================================================
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/recetas', require('./routes/recetas')); // Ruta de recetas
app.use('/api/servicios', require('./routes/servicios')); // Ruta de servicios

// =====================================================================================
// RUTA TEMPORAL DE INSTALACIÓN DE BASE DE DATOS
// =====================================================================================
const fs = require('fs');
app.get('/setup-db', async (req, res) => {
  try {
    const db = require('./config/db');
    const sqlPath = path.join(__dirname, 'database.sql');

    if (!fs.existsSync(sqlPath)) {
      return res.status(404).send('❌ Archivo database.sql no encontrado en el servidor.');
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');
    const statements = sql.split(/;\s*$/m).map(s => s.trim()).filter(s => s.length > 0);

    let output = '<h1>Log de Instalación</h1><pre>';

    for (const statement of statements) {
      if (statement.startsWith('--') || statement.startsWith('/*')) continue;
      try {
        await db.query(statement);
        output += `✅ ÉXITO: ${statement.substring(0, 50)}...\n`;
      } catch (err) {
        output += `⚠️ ADVERTENCIA: ${err.message}\n`;
      }
    }

    output += '\n🏁 ¡PROCESO TERMINADO!</pre>';
    res.send(output);
  } catch (error) {
    res.status(500).send(`❌ Error fatal: ${error.message}`);
  }
});

// =====================================================================================
// SIRVE ARCHIVOS ESTÁTICOS (CSS, JS, HTML, imágenes, etc.)
// =====================================================================================
app.use(express.static(path.join(__dirname, 'public')));

// =====================================================================================
// RUTA RAÍZ - Sirve main.html (página de bienvenida) como página de inicio
// =====================================================================================
app.get('/', (req, res) => {
  // Headers para evitar caché y asegurar que siempre cargue main.html
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// =====================================================================================
// INICIA EL SERVIDOR
// =====================================================================================
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log('⏰ Servidor ACTIVO y esperando peticiones...');
  console.log('💡 Presiona Ctrl+C para detener el servidor');
});

// =====================================================================================
// MANEJO DE ERRORES GLOBALES PARA EVITAR QUE EL SERVIDOR SE CIERRE
// =====================================================================================
process.on('uncaughtException', (error) => {
  console.error('❌ Error no capturado:', error);
  console.log('⚠️ El servidor continúa ejecutándose...');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
  console.log('⚠️ El servidor continúa ejecutándose...');
});

process.on('SIGINT', () => {
  console.log('\n⚠️ Servidor interrumpido por el usuario');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

console.log('📌 Servidor configurado y listo');
