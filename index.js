const express = require('express');
const fetch = require('node-fetch'); // Instala con npm install node-fetch
const cors = require('cors');

const app = express();
app.use(cors());

const API_TOKEN = process.env.BRAWL_TOKEN;

app.get('/brawlers', async (req, res) => {
  const response = await fetch(`https://api.brawlstars.com/v1/brawlers`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  const data = await response.json();
  res.json(data);
});

app.get('/brawlers/:id', async (req, res) => {
  const response = await fetch(`https://api.brawlstars.com/v1/brawlers/${req.params.id}`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  const data = await response.json();
  res.json(data);
});

app.get('/events', async (req, res) => {
  const response = await fetch(`https://api.brawlstars.com/v1/events`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  const data = await response.json();
  res.json(data);
});

// Export para Vercel
module.exports = app;