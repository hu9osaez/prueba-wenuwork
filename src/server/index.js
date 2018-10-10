const express = require('express');
const bodyParser = require('body-parser');

require('./config/db');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

app.use('/api/autos', routes.autos);
app.use('/api/usuarios', routes.usuarios);

app.listen(7000, () => console.log('Listening on port 7000!'));
