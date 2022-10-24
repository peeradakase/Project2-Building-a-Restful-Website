const homeController = (req, res) => {
  res.render('home/index', {title: 'Home'});
}

module.exports = homeController;
