// file for organization router


//เราimport express มาก่อน
//เพราะเราต้องการใช้ f router ที่อยุ่ใน express
const express = require('express');
const router = express.Router();

function authenticateUserApi(req, res, next) {
  if (!req.session?.user?.id) {
    return res.status(401).json({
      error: {
        message: 'Please login first'
      }
    })
  }
  return next()
}

function authenticatePage(req, res, next) {
  if (!req.session?.user?.id) {
    return res.redirect('/');

  }
  return next()
}


//เมื่อ router ได้รับreqแบบget ให้import controller ตัวนี้มาใช้
router.get('/', require('./src/controllers/pages/home/index.js'));
router.get('/my/account-detail', authenticatePage, require('./src/controllers/pages/my/account-details/index.js'));
router.get('/my/orders', require('./src/controllers/pages/my/orders/index.js'));
router.get('/products/:id', require('./src/controllers/pages/products/show.js'));
//ค้างหน้า /my/orders/:id
router.get('/auth/login', require('./src/controllers/pages/auth/login.js'));
router.get('/auth/signup', require('./src/controllers/pages/auth/signup.js'));
router.get('/my/orders/:id/payment', require('./src/controllers/pages/my/orders/payment/create.js'))
router.get('/my/orders/confirmation', require('./src/controllers/pages/my/orders/confirmation/show.js'))



//APIEnd point
router.get('/api/products/new-arrival', require('./src/controllers/api/products/new-arrival.js'))
router.get('/api/products/best-seller', require('./src/controllers/api/products/best-seller.js'))
router.get('/api/products/store-girls', require('./src/controllers/api/products/store-girls.js'))
router.get('/api/products/:id', require('./src/controllers/api/products/show.js'))
router.post('/api/auth/signup', require('./src/controllers/api/auth/signup.js'))
router.post('/api/auth/login', require('./src/controllers/api/auth/login.js'))
router.delete('/api/auth/logout', require('./src/controllers/api/auth/logout.js'))

router.get('/api/my/account-detail', authenticateUserApi, require('./src/controllers/api/my/account-detail/index.js'))
router.put('/api/my/account-detail', authenticateUserApi, require('./src/controllers/api/my/account-detail/update.js'))
router.post('/api/orders', authenticateUserApi, require('./src/controllers/api/orders/create.js'));



module.exports = router;
