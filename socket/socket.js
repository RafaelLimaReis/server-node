const MessageController = require('../api/controllers/MessageController');

module.exports = (io) => {
  const chat = new MessageController(io.app.configs.db.models);

  io.on('connection', (socket) => {
    socket.on('join-room', (connection) => {
      socket.connection = connection;
      chat.createRoom(connection);
      socket.join(connection.room);
    });

    socket.on('rejoin', (connection) => {
      socket.connection = connection;
      socket.join(connection.room);
    });

    socket.on('add', (data) => {
      io.in(socket.connection.room).emit('message', {
        message: data.message,
        id_userSend: data.id_userSend,
        date: new Date()
      });

      chat.saveMessage(data);
    });

    socket.on('disconnect', (room) => {
      socket.leave(room);
    });
  });
}

/**
 * Docs até que boa para ajudar a configurar events
 *  - https://socket.io/docs/
 *  - Livro (Node.js Aplicações web real-time com Node.js - Casa do Código)
 *  (pgna 77 e 78)
 */
