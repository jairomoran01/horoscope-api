const express = require('express');
const cors = require('cors');
const horoscopes = require('../data/horoscopes');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET']
}));

// Modificar la ruta para que coincida con la estructura de Vercel
app.get('/', (req, res) => {  // Cambiado de '/api/horoscope' a '/'
  const { sign } = req.query;
  
  if (!sign || !horoscopes[sign.toLowerCase()]) {
    return res.status(400).json({
      error: 'Signo zodiacal no válido'
    });
  }

  const horoscopeArray = horoscopes[sign.toLowerCase()];
  const randomIndex = Math.floor(Math.random() * horoscopeArray.length);
  
  res.json({
    sign: sign.toLowerCase(),
    horoscope: horoscopeArray[randomIndex]
  });
});

module.exports = app;