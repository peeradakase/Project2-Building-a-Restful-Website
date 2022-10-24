const loginController = (req, res) => {
  res.render('auth/login',{title: 'Log In'});
}
module.exports = loginController;
