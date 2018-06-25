const MessageController = require('../api/controllers/messageController');

module.exports = (io) => {
  const chat = new MessageController(io.app);

  io.on('connection', (socket) => {
    socket.on('join-room', (connection) => {
      socket.connection = connection;
      chat.createRoom(connection)
      console.log(connection);
      socket.join(connection.room);
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
      console.log('teste');
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
