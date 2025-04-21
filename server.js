const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Habilitar CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Base de datos en memoria
let eventos = [];

// Ruta para recibir eventos (POST)
app.post('/api/evento', (req, res) => {
  const evento = req.body;
  console.log("Evento recibido:", evento);
  eventos.push(evento);

  // (opcional) guardar en archivo
  fs.appendFileSync('eventos.txt', JSON.stringify(evento) + '\n');

  res.status(200).json({ message: 'Evento recibido correctamente' });
});

// Ruta para consultar eventos (GET)
app.get('/api/eventos', (req, res) => {
  res.status(200).json(eventos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
