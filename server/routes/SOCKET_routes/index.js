'use strict';

const io = require('socket.io')();
const eventHandlers = require('./eventHandlers');


io.on('connection', (socket) => {
  let clients = eventHandlers.addToDB(socket.id);
  const connectedClients = () => clients.length;

  socket.on('coordinates', (data) => {
    // Todo - insert logs here - SQL
    socket.emit(`coordinates/room`, data);
  });

  socket.on('drainage', (data) => {
    // Todo - insert logs here - SQL
    socket.emit(`drainage/room`, data);
  });

  socket.on('disconnect', () => {
    clients = eventHandlers.onClientDisconnect(socket.id);
    const clientCount = connectedClients();
    socket.broadcast.emit('root/update_socket_count', { clientCount });
  });

});

module.exports = io;