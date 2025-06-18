// Simple health check server to test Railway deployment
const http = require('http');

const PORT = process.env.PORT || 8080;

console.log('=== ENVIRONMENT CHECK ===');
console.log('PORT:', PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('MEDUSA_ADMIN_BACKEND_URL:', process.env.MEDUSA_ADMIN_BACKEND_URL || 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('COOKIE_SECRET:', process.env.COOKIE_SECRET ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('========================');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      port: PORT,
      env: {
        database: !!process.env.DATABASE_URL,
        jwt: !!process.env.JWT_SECRET,
        cookie: !!process.env.COOKIE_SECRET,
        adminUrl: process.env.MEDUSA_ADMIN_BACKEND_URL || 'not set'
      }
    }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server running on port ${PORT}`);
});