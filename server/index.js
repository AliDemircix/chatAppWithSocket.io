
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } }); // to avoid cors error use {cors: {origin: "*"}}

io.on('connection', (socket) => {

    // it is coming frontend with 'join'
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        // to send a message from admin when user joined to room
        socket.emit('message', { user: 'admin', text: `${user.name} Welcome to room ${user.room}` })
       
       //to send message all room to inform user joined
       socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name}, joined`});

        //socket.join is a method that allow user to join specific room
        socket.join(user.room);

        //for now there is no error from frontend
        callback();
    });

    socket.on('sendMessage', (message,callback)=> {
        // get user from socket id 
        const user= getUser(socket.id);
        // send user message to room in backend to frontend
        io.to(user.room).emit('message',{user:user.name,text:message});

        callback();
    })

    socket.on('disconnect', () => {
        console.log('One user disconnected');
    })
});
app.use(cors());
app.use(router);

server.listen(PORT, () => console.log(`Server has started port : ${PORT}`));