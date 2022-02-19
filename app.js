const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const formRoutes = require('./api/routes/formservice'); 
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb+srv://nitesh-user-1:'+ process.env.MONGO_ATLAS_PW +'@cluster0.dlsws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// mongosh "mongodb+srv://cluster0.dlsws.mongodb.net/myFirstDatabase" --username nitesh-user-1
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept,Authorization')
    if(req.method === 'OPTIONS') { 
       res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
       return res.status(200).json({})
    }
    next();
});

app.use('/form',formRoutes);
app.use('/user',userRoutes);

app.use(function(req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});


module.exports = app;