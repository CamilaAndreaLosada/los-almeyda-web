const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedCategories() {
    console.log('🌱 Iniciando carga de categorías...');

    const config = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false }
    };

    try {
        const connection = await mysql.createConnection(config);
        console.log('✅ Conectado a la base de datos.');

        const query = `
            INSERT IGNORE INTO CATEGORIAS (nombre_categoria) VALUES 
            ('Cerdo'),
            ('Res'),
            ('Aves'),
            ('Del Mar'),
            ('Embutidos'),
            ('Servicios');
        `;

        await connection.query(query);
        console.log('✅ Categorías insertadas correctamente.');

        const [rows] = await connection.query('SELECT * FROM CATEGORIAS');
        console.log('📋 Categorías actuales en DB:', rows);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedCategories();
