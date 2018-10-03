const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
//const db = require('../database/index.js');

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('listening on port 3000');
});


