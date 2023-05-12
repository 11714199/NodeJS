const express = require('express');
const router = express.Router();
const signIn = require('../services/signIn.js')
const userData = require('../services/getData.js')

router.post('/login', signIn.login)
router.get('/getEmployeeData', userData.getEmployeeData)

module.exports = router;