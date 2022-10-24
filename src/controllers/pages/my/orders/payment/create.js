const paymentController = (req, res) => {
  res.render('my/orders/payment/create', { title: 'payment'});
}
module.exports = paymentController;
