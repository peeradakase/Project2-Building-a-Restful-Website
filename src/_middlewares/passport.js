const passport = require("passport");
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const prisma = require('../helpers/prisma');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) return done(null, false, { email: 'Email Not Found' })
    if (!await bcrypt.compare(password, user.password)) return done(null, false, { password: 'Incorrect Password' })
    return done(null, _.omit(user, ['password']))
  } catch (err) {
    return done(err)
  }
}))

module.exports = passport;
