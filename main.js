//file for set up server

//import(require)ทุกอย่างให้เสดก่อน
require('dotenv/config');
const bodyParser = require('body-parser');
const { ironSession } = require('iron-session/express');

//1.import path (JS library)
const path = require('path');

//2.import express (JS library)
const express = require('express');

//3.1 (L1) import express-ejs-layouts(JS library) ที่ใช้สำหรับlayouts
const expressLayouts = require('express-ejs-layouts');



//4. import router (./ แปลว่า importมาจากเครื่องเรา)
const router = require('./router');

//5. จำเอา  create app from express
//define app เพื่อ เอาไปใช้ในบรรทัดล่าง
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

console.log(process.env.SECRET_COOKIE_PASSWORD, ' :process.env.SECRET_COOKIE_PASSWORD');
app.use(ironSession({
  cookieName: 'iron-session',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}))

//3.2 (L2) บอกให้appรู้ว่า เราต้องการใช้ js library expressLayouts
app.use(expressLayouts)
//3.3 (L3) บรรทัดนี้ แปลว่า  บอกให้appรู้ว่า ให้folder ./layouts/public ดูเเล จัดการ layout
app.set('layout', './layouts/public');

//6. static
//บอกให้appรู้ว่า เรากำหนดให้ folder public เป็นที่เก็บ static file
app.use(express.static('public'));

//7. views
//บอกให้appรู้ว่า ให้folder path.join(__dirname, './views')นี้ ดูแลจัดการ views
//__dirname คือ ที่อยู่(path)ของFolderปจบ.
//.join คือ ให้เอา pathสองอันมา join กัน
app.set('views', path.join(__dirname, './views'));
//การจะให้ viewเป็น ejs(js library) ได้ ต้องอาศัย บรรทัดนี้ จำเอา!
app.set('view engine', 'ejs');

//8.บอกให้appรู้ว่า ที่pathนี้(/)  ให้มาอ่านrouterนี้
app.use('/', router);

//ต่อไปคือ ให้run ที่portไหน
//ถ้าapp run ที่port3000แล้ว ให้ทำcallback
app.listen(3000, () => {
  console.log('Application starts at Port 3000')
})
