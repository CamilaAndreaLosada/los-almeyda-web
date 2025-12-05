console.log('🟢 Proceso iniciado');

let counter = 0;
const interval = setInterval(() => {
    counter++;
    console.log(`⏰ El proceso sigue vivo - ${counter} segundos`);
}, 1000);

console.log('✅ SetInterval configurado');
console.log('💡 Presiona Ctrl+C para detener');

process.on('SIGINT', () => {
    console.log('\n⚠️ Deteniendo proceso...');
    clearInterval(interval);
    process.exit(0);
});
