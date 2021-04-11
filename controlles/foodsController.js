const foodModel = require('../models/foodModel');


module.exports.addFood= (req,res)=>{
    const food = new foodModel({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        discount:req.body.discount,
        rate:req.body.rate,
        description:req.body.description,
    });
    food.save().then((result)=>{
        res.json({data:result["_id"]});
    }).catch((err)=>{
        console.log(err);
        res.json({err:err});
    })
};

module.exports.getFoods= (req,res)=>{
    foodModel.find((err,result)=>{
        if(err) return  res.json(err);
        return  res.json(result);
    })
};

module.exports.addFoodImage = async (req,res)=>{
    await foodModel.findOneAndUpdate(
        {_id:req.params.id},
        {
            $set :{
                coverImage:req.file.path,
            }
        },
        {
            new :true
        },
        (err,result)=>{
            if(err){
                return res.json({err:err});
            }

            return res.json(result);
        }
    );
};

module.exports.updateFood = async (req,res) =>{
    const id = req.params.id;
    await foodModel.findByIdAndUpdate(id,foodModel.updateOne({
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            discount:req.body.discount,
            rate:req.body.rate ?req.body.rate: "5",
            description:req.body.description,
        }, ),
        (err,result)=>{
            if(err){
                return res.json({err:err});
            }
            return res.json(result);
        }
    );
};

module.exports.deleteFood = (req, res) =>{
    foodModel.findByIdAndRemove(req.params.id,null,(error,result)=>{
        if(result == null){
            return res.json({"msg":false});
        }
        return res.json({"msg":true});
    });

};

