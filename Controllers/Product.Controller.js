const Product = require('../Models/Product.model')

module.exports ={
getAllProducts : async(req,res,next)=>{
    try{
    const results =await Product.find({},{__v:0});
    res.send({
        status:200,
        message:"product listing success",
        results
    });
   
    }
    catch(error){
    res.send(error)
       }
    },

createProduct:async(req,res,next)=>{

    try{
    const product =new Product(req.body);
    const result = await product.save();
    res.send({
        status:200,
        message:"product added successfully"
    })
    }
    catch (error){
        res.send(error);
    }     
    },
findProductById:async(req,res,next)=>{
    const id = req.params.id;
    
    try {
        const product=await Product.findById(id);
        res.send({
            status:200,
            message:"product listig successfully",
            product
        })
        if(!product){
            throw createError(404,"Product Does Not exist");
        }
    
    } catch (error) {
        if(error instanceof mongoose.CastError){
            next(createError(400,"Invalid product id"))
            return;
        }
        next(error)
    }      
    },

    updateProductById:async(req,res,next)=>{
    
        try {
            const id = req.params.id;
            const updates =req.body;
            const options = {new :true}
            const result= await Product.findByIdAndUpdate(id,updates);
            res.send({
                status:200,
                message:"product updated successfully"
            })
            if(!result){
                throw createError(404,"Product does not exist");
            }
        } catch (error) {
            console.log(error);
            if(error instanceof mongoose.CastError){
                return next(createError(400,"Invalid Product Id"))
            }
            next(error);
        }
       
    }  ,

    deleteProductById:async(req,res,next)=>{
        const id = req.params.id;
        try {
            const result =await Product.findOneAndDelete(id);
            res.send({
                status:200,
                message:"product deleted successfully"
            })
    
        } catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400,"Invalid product id"))
                return;
            }
            next(error)    
            
        }
       
    }






}