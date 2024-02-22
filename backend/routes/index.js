const express = require('express');


const userRouter = require('./user')
const userAccounts = require('./accounts')

const router = express.Router();
router.use('/user',userRouter)
router.use('/accounts',userAccounts)

module.exports = router