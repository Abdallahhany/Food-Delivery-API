const express = require('express');
const foodRouter = express.Router();
const foodController =require('../controlles/foodsController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./uploads");
    },
    filename:(req, file, cb)=>{
        cb(null,req.params.id + '.jpg');
    }
});


const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 6,
    },
});


foodRouter.post('/addFood',foodController.addFood);
foodRouter.put('/updateFood/:id',foodController.updateFood);
foodRouter.get('/getFoods',foodController.getFoods);
foodRouter.delete('/deleteFood/:id',foodController.deleteFood);

foodRouter.patch('/add/coverImage/:id',upload.single("img"),foodController.addFoodImage);


module.exports = foodRouter;