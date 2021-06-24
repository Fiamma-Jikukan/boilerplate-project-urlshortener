require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const schema = new mongoose.Schema({ url: "string" })
const url = mongoose.model('url', schema)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));



// app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/shorturl', async function (req, res) {
  console.log(req.body);
  const url = new url({ url: req.body.url })
  await url.save((err, data) => {
    res.json({ created: true })
  })
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
