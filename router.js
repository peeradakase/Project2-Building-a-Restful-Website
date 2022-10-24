// file for organization router


//เราimport express มาก่อน
//เพราะเราต้องการใช้ f router ที่อยุ่ใน express
const express = require('express');
const router = express.Router();

//เมื่อ router ได้รับreqแบบget ให้import controller ตัวนี้มาใช้
router.get('/', require('./src/controllers/pages/home/index.js'));
router.get('/my/account-details', require('./src/controllers/pages/my/account-details/index.js'));
router.get('/my/orders', require('./src/controllers/pages/my/orders/index.js'));
router.get('/products/:id', require('./src/controllers/pages/products/show.js'));
//ค้างหน้า /my/orders/:id
router.get('/auth/login', require('./src/controllers/pages/auth/login.js'));
router.get('/auth/signup', require('./src/controllers/pages/auth/signup.js'));


module.exports = router;
