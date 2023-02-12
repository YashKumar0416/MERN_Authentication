const express = require('express');
const router = express.Router();
const ProductSchema = require('../models/Products');
const OrderSchema = require('../models/Orders')

//ALL PRODUCTS
router.post('/products', async(req, res)=> {

    const data = await ProductSchema.find({});
    if(data) {
        return res.status(200).json({data})
    } else {
        return res.status(400).json({error: "No data found"})
    }
});


//PLACE ORDER
router.post('/saveorder', async (req, res)=> {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date })

    let emailId = await OrderSchema.findOne({email: req.body.email})
    if (emailId === null) {
        try {
            await OrderSchema.create({email: req.body.email, order_data: [data]})
            .then(()=> {
                res.status(200).json({success: true})
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    } else {
        try {
            await OrderSchema.findOneAndUpdate({email: req.body.email}, {$push: {order_data: data}})
            .then(()=> {
                res.status(200).json({success: true})
            })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

module.exports = router;