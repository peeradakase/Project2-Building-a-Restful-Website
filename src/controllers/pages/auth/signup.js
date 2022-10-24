const signupController = (req, res) => {
  res.render('auth/signup', {title: 'Sign Up'});
}
module.exports = signupController
