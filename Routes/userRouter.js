const express = require('express');
const userController = require('../controlles/userController');
const userRouter = express.Router();
const middleware = require('../middelwares/middleware');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./images");
    },
    filename:(req, file, cb)=>{
        cb(null,req.params.username + '.jpg');
    }
});


const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 6,
    },

});

userRouter.get('/getusers',userController.users);

userRouter.get('/:username', middleware.checkToken ,userController.getUser);

userRouter.post('/signup',userController.signUp);

userRouter.patch('/update/:username',userController.UpdatePassword);

userRouter.delete('/:username',middleware.checkToken,userController.deleteAccount);

userRouter.post('/login',userController.login);

userRouter.get('/checkusername/:username',userController.checkUserName);

userRouter.patch('/add/image/:username',middleware.checkToken,upload.single("img"),userController.addImg);


module.exports = userRouter;