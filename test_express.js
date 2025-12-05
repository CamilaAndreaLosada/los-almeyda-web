const express = require('express');
const app = express();

console.log('✅ Express importado');

app.get('/', (req, res) => {
    res.send('¡Servidor funcional!');
});

console.log('✅ Ruta configurada');

const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor Express en http://localhost:${PORT}`);
});

// Mantener vivo
let counter = 0;
setInterval(() => {
    counter++;
    console.log(`⏰ Servidor activo - ${counter} segundos`);
}, 5000);

console.log('📌 Llegó al final del archivo');
