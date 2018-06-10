const passport = require('passport');
const jwtToken = require('passport-jwt');
const ExtractJwt = jwtToken.ExtractJwt;
const Strategy = jwtToken.Strategy;
const params = {
  secretOrKey: process.env.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
  const strategy = new Strategy(params, function (payload, done) {
    const user = payload || null;
    if (user) {
      return done(null, { id: user.id, email: user.email });
    } else {
      return done(new Error('User not found'), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate('jwt', {session: false});
    }
  };
};
