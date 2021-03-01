const mongoose = require('mongoose')
const Schema =mongoose.Schema


  const ProductSchema = new Schema({
      name:{
          type:String,
          required:true
      },
      price:{
        type:Number,
        required:true
      },
      productcode:{
        type:String,
        required:true
      },
      category:{
        type:String,
        required:true
      }
  })

  const Product = mongoose.model('products',ProductSchema);

  module.exports =Product;