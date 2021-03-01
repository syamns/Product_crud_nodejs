const express = require('express');
const mongoose =require('mongoose');
const createError =require('http-errors');

const app =express();
app.use(express.json())
mongoose.connect('mongodb+srv://user:user@cluster0.ifjqh.mongodb.net/',{
dbName:'product_crud',
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify:false
})
.then(()=>{
console.log("mongod connected");
})

const ProductRoute = require('./Routes/Product.route');
const userRoute=require('./Routes/User.route')
app.use('/product',ProductRoute)
app.use('/user',userRoute)

app.use((req,res,next)=>{
// const err =new Error("not found");
// err.status=404
// next(err)
next(createError(404,'Not Found'))
});
// error handler

app.use((err,req,res,next)=>{
res.status(err.status ||500)
res.send({
    error:{
        status:err.status || 500,
        message:err.message
    }
})
});
app.listen(3000,()=>{
    console.log("server started ");
});