const mongoose = require('mongoose');
const mongoURI = process.env.MONGOURI;

const mongoDB = async ()=> {
    mongoose.connect(mongoURI, async (err, result)=> {
        if(err) {
            console.log(err)
        }else {
            console.log('Connected to Database Successfully')
        }
    })
};

module.exports = mongoDB();