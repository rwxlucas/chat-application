require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { dbInit } = require('./db');
const { PORT } = require('./keys')
const routes = require('./routes/index');
const cors = require('cors');
const onConnection = require('./socket/index');

const app = express();
const server = createServer(app);
const io = require('socket.io')(server, {
	cors: { origin: 'http://localhost:3000' }
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '50mb' }));

io.on('connection', client => onConnection(io, client));

app.use(routes)

// DB Connection
dbInit();

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));