const ordersController = (req, res) => {
  res.render('my/orders/index', {title: 'My Orders'});
}
module.exports = ordersController;
