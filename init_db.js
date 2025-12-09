const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function initDB() {
    const sqlPath = path.join(__dirname, 'database.sql');

    if (!fs.existsSync(sqlPath)) {
        console.error('❌ Error: No se encontró el archivo database.sql');
        return;
    }

    console.log('🚀 Iniciando creación de tablas (Modo Simple)...');

    try {
        const sql = fs.readFileSync(sqlPath, 'utf8');
        const statements = sql
            .split(/;\s*$/m)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            if (statement.startsWith('--') || statement.startsWith('/*')) continue;

            try {
                // Modo simple: db.query usa la configuración de config/db.js
                // que crea y cierra conexión automáticamente
                await db.query(statement);
                console.log(`✅ Ejecutado: ${statement.substring(0, 50).replace(/\n/g, ' ')}...`);
            } catch (err) {
                // Si la tabla ya existe, no es un error grave 
                console.error(`❌ Error ejecutando: ${statement.substring(0, 50)}...`);
                //console.error(err.message);
            }
        }

        console.log('🏁 ¡Base de datos inicializada correctamente!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error fatal:', error);
        process.exit(1);
    }
}

initDB();
