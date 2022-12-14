'use strict';

const io = require('socket.io')();
const eventHandlers = require('./eventHandlers');


io.on('connection', (socket) => {
  let clients = eventHandlers.addToDB(socket.id);
  const connectedClients = () => clients.length;


  socket.on('coordinates', (data) => {
    console.log('coordinates sent: ', data);
    // Todo - insert logs here - SQL
    socket.broadcast.emit(`coordinates/room`, data);
  });

  socket.on('drainage', (data) => {
    console.log('drainage sent: ', data);
    // Todo - insert logs here - SQL
    socket.broadcast.emit(`drainage/room`, data);
  });

  socket.on('disconnect', () => {
    clients = eventHandlers.onClientDisconnect(socket.id);
    const clientCount = connectedClients();
    socket.broadcast.emit('root/update_socket_count', { clientCount });
  });

});

module.exports = io;