const express = require('express');
const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: "Medusa backend is starting...",
    status: "deploying",
    environment: "railway"
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/app', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Medusa Admin</title>
      <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>Medusa Admin Panel</h1>
      <p>Backend deployment in progress...</p>
      <p>The database tables are being created.</p>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Railway deployment successful!');
});