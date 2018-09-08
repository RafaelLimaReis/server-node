const auth = require('../configs/auth');
const OfferController = require('../controllers/OfferController');

module.exports = (app) => {
  let offerController = new OfferController(app.configs.db.models);

  app.route('/offer')
    .get(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await offerController.findAll(req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
    .post(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await offerController.create(req.user, req.body);
        next();
      } catch (e) {
        throw e;
      }
    })
  app.route('/offer/:id')
    .get(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await offerController.findOffers(req.params.id)
        next();
      } catch (e) {
        throw e;
      }
    })
    .put(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await offerController.updateStatus(req.user, req.body, req.params.id);
        next();
      } catch (e) {
        throw e;
      }
    })
}
