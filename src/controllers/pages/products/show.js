const productsController = (req, res)=> {
  res.render('products/show', {title: 'Products'});
}
module.exports = productsController;
