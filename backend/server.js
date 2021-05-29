require('dotenv').config();
const express = require('express');
const { dbInit } = require('./db');
const { PORT } = require('./keys')
const routes = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

app.use(routes)

// DB Connection
dbInit();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));