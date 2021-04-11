const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app =express();
const foodRouter = require('./Routes/foodRouter');
const https =require('https');
const userRouter = require('./Routes/userRouter');



mongoose.connect('mongodb+srv://test:test@cluster0.6sjxc.mongodb.net/foodDelivery?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify:false},)
    .then(()=>{
        console.log('connected to mongodb');
    });

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

app.use("/uploads",express.static("uploads"));
app.use("/images",express.static("images"));

app.use(express.json());
app.use('/foods',foodRouter);
app.use('/users',userRouter);





app.get('/',(req,res)=>{res.json({
    msg:"Welcome to my Food delivery server",
})});


const port = process.env.PORT || 8080;
https.createServer({key:privateKey,cert:certificate},app)
    .listen(port,(()=>{
    console.log(`Connected to port ${port} successfully`);
}));