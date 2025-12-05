// server_test.js - Servidor mínimo para depuración
const express = require('express');
const path = require('path');
const app = express();

console.log('✅ Express cargado');

app.use(express.json());
console.log('✅ Middleware configurado');

app.use(express.static(path.join(__dirname, 'public')));
console.log('✅ Archivos estáticos configurados');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
console.log('✅ Ruta raíz configurada');

const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor TEST corriendo en http://localhost:${PORT}`);
    console.log('⏰ El servidor está ACTIVO y esperando peticiones...');
});

// Manejar cierre graceful
process.on('SIGINT', () => {
    console.log('\n⚠️ Cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado');
        process.exit(0);
    });
});

console.log('📌 Llegó al final del archivo server_test.js');
