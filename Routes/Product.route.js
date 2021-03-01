const express = require('express');
const router = express.Router();
const Product =require('../Models/Product.model')
const createError= require('http-errors')
const mongoose=require('mongoose')
const ProductController =require('../Controllers/Product.Controller')

// create product
router.post('/create',ProductController.createProduct);
// get all products list
router.get('/list',ProductController.getAllProducts);
// get product by id
router.get('/:id',ProductController.findProductById);
// update product by id
router.post('/:id',ProductController.updateProductById);
// delete product by id
router.delete('/:id',ProductController.deleteProductById);

module.exports = router;