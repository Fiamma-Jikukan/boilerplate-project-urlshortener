require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

// app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/shorturl', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function (req, res) {
  const { name } = req.body
  if (name) {
    return res.status(200).json({ name : 'hello ${name}' });
  }
  res.status(401).json({ name : "baka"});
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
