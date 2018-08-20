const auth = require('./../configs/auth')();
const MessageController = require('../controllers/MessageController');

module.exports = (app) => {
  let messageController = new MessageController(app.configs.db.models);

  app.route('/messages')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await messageController.all(req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
  app.route('/messages/:room')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await messageController.findRoom(req.user, req.params.room);
        next();
      } catch (error) {
        throw error;
      }
    });
}