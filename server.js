const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let eventos = [];

// Ruta para recibir datos
app.post('/evento', (req, res) => {
    const { boton } = req.body;
    const timestamp = Date.now();

    if (!boton) {
        return res.status(400).json({ message: "Falta el número del botón" });
    }

    const evento = { boton, timestamp };
    eventos.push(evento);

    fs.writeFileSync('eventos.json', JSON.stringify(eventos, null, 2));

    console.log('Evento recibido:', evento);
    res.status(200).json({ message: "Evento recibido", evento });
});

// Ruta para mostrar los eventos
app.get('/api/eventos', (req, res) => {
    res.json(eventos);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
