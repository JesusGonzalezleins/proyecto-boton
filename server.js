const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let eventos = [];

app.post('/api/evento', (req, res) => {
  const evento = req.body;
  console.log('Evento recibido:', evento);
  eventos.push(evento);
  res.status(200).json({ message: 'Evento recibido' });
});

app.get('/api/eventos', (req, res) => {
  res.json(eventos);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
