const express = require('express')
const users = require('../models/user')
const router = express.Router()

// Get login page
router.get('/', (req, res) => {
  res.render('index')
})

// login method
router.post('/', (req, res) => {
  const user = users.find(user => user.email === req.body.email)
  if(!user) {
    req.flash('error_messages', '此Email不存在！')
    res.redirect('/')
  } else if(user && req.body.password !== user.password) {
    req.flash('error_messages', '密碼輸入錯誤！')
    res.redirect('/')
  } else {
    req.flash('success_messages', '成功登入！')
    res.render('welcome', { name: user.firstName })
  }
})

module.exports = router