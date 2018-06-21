const MessageController = require('../api/controllers/messageController');

module.exports = (io) => {
  const message = new MessageController(io.app);
  io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
      socket.data.room = room;
      socket.join(room);
    });

    socket.on('add', (data) => {
      socket.to(socket.data.room).emmit('message',
        {
          message: data.message,
          from: data.from,
          date: new Date()
        });
    });

    socket.on('set-name', (name) => {
      socket.data.user = name;
    });
  });
}

/**
 * Docs até que boa para ajudar a configurar events
 *  - https://socket.io/docs/
 *  - Livro (Node.js Aplicações web real-time com Node.js - Casa do Código)
 *  (pgna 77 e 78)
 */
