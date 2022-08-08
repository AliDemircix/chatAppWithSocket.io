
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=> {
    console.log('New User connected')

    socket.on('disconnect', () => {
        console.log('One user disconnected');
    })
});

app.use(router);

server.listen(PORT, ()=> console.log(`Server has started port : ${PORT}`));