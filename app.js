const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Halo dari pipeline CI/CD!', build: process.env.BUILD_NUMBER || 'local' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
