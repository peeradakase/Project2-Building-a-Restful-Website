const confirmationController =  (req, res) => {
  res.render('my/orders/confirmation/show', { title: 'confirmation Order'});
}
module.exports = confirmationController;
