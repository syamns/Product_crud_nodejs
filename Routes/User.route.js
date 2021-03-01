const express = require('express');
const router = express.Router();
const User =require('../Models/User.model')
const createError= require('http-errors')
const mongoose=require('mongoose')
const UserController =require('../Controllers/User.controller')

// create product
router.post('/signup',UserController.registerUser);
// get all products list
router.post('/signin',UserController.loginUser);


module.exports = router;