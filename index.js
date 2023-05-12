const express = require('express');
const app = express();
const router = require('./routes/router.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use('/', router);
app.use(morgan('dev'), router);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.listen(2000, (req, res) => {
    console.log("Port Running on 2000")
})