const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));

app.listen(7000, () => console.log('Listening on port 7000!'));
