const db = require('./config/db');

async function testWrapper() {
    try {
        console.log('🧪 Probando wrapper de DB...');
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('✅ Resultado de query:', rows[0].result);

        const [products] = await db.query('SELECT * FROM PRODUCTOS LIMIT 1');
        console.log('✅ Productos encontrados:', products.length);
    } catch (error) {
        console.error('❌ Error en testWrapper:', error);
    }
}

testWrapper();
