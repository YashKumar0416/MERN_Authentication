require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoDB = require('./db/db');
const cors = require('cors');
const path = require('path');

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Orign, X-Requested-with, Content-Type, Accept"
    );
    next();
})

//STATIC FILES
app.use(express.static(path.join(__dirname, './client/build')))
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/NewUser'))
app.use('/api', require('./routes/Products'))

app.listen(PORT, ()=> {
    console.log(`Server listening to port ${PORT}`)
})