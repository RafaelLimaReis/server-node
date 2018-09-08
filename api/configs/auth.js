const jwt = require('jws');

const authenticate = (req, res, next) => {
  try {
    const slice = req.headers.authorization.split(' ')[1];
    const decoder = jwt.decode(slice);

    req.user = decoder.payload;
    next();
  } catch (error) {
    return res.status(401);
  }
}

module.exports = {authenticate}
