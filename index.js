const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const config = require('./config/keys');

// const mongoose = require('mongoose');
// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

require('./routes/dialogFlowRoutes')(app);

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT);