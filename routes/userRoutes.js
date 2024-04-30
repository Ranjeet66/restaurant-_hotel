const express = require('express');
const User = require('../models/user');
const posts = require('../models/postsSchema');
const {jwtAuthMiddleware,generateToken} = require('../jwt');
// const user = require('../models/user');
const postsSchema = require('../models/postsSchema');
// const commonfunction = require('../commonfunction');
let multer = require('multer');
const commonfunction = require('../commonfunction');
var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads') 
    // },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
const upload = multer({storage:storage})

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dlqjbnrqk',
    api_key: '792375176357873',
    api_secret: '7MhD3CtCTt2h_dSPdHmbZglqEOQ'
});

const router = express.Router();

router.post('/registration', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const respone = await newUser.save();
        console.log('data saved');
        const payload = {
            id:respone.id,
            username:respone.username
        };
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ",token);

        res.status(200).json({respone: respone, token: token});

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interal Server error' });

    }
});

router.post('/login',async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }
        const payload = {
            id: user.id,
            username:user.username
        };
        const token  = generateToken(payload);
        res.json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Interal Server error' });
  
    }

});

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try {
       const userData = req.user;
       console.log("User Data: ",userData); 
       const userId = userData.id;
       const user = await User.findById(userId); 
       res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Interal Server error' });   
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        console.log("Data Fetched");
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interal Server error' });

    }
});

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; 
        const updatedPersonData = req.body; 
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, 
            runValidators: true, 
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const userId = req.params.id; 
        const response = await User.findByIdAndRemove(userId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


router.post('/addPosts',upload.array('image',15),async(req,res)=>{
    try {
       
        let image = [];
        console.log(".............Hello array");
        for (i = 0; i<req.files.length; i++) {
            console.log(".............1");

            let f = await commonfunction.uploadImage(req.files[i].path);
            console.log(".............2");

            image.push(f);
            console.log(".............3");

        }
        req.body.image=req.body.image
        console.log(".............4");

        req.body.title=req.body.title;
        console.log(".............5");

        req.body.bodys=req.body.bodys
        console.log(".............6");


        // let findByLocation = User.aggregate([{
        //     "$geoNear":{
        //         "near":{
        //             "type":"Point",
        //             "coordinates":[parseFloat(req.query.long),parseFloat(req.query.lat)]
        //         },
        //         "maxDistance":5*1000,
        //         "distanceField":'distance',
        //         "distanceMultiplier":1/1000,
        //         "spherical":true
        //     }
        // }])
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/uploadImage',async(image)=>{
        try {
            let upload = await cloudinary.uploader.upload(image);
            if(upload){
            res.status(200).json(respone);
        }else{
            res.status(400).json({error:"Image Not Upload"});
        }
        return upload.secure_url;

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/retPosts',async(req,res)=>{
    try {
        let retrieve  = req.postsId;
        let getPost = await postsSchema.findOne(retrieve);
        if(!getPost){
            res.status(400).json({error:"Post Not Found"});

        }else{
                //res.status(200).json({error:"Post Not Found"});
                res.status(200).json(getPost);

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

    router.post('/inActive',async(req,res)=>{
        try {
            let getData = req.postsId;
            if(!getData){
                res.status(400).json({error:"Post Not Found"});
 
            }else{
                let inActPost =await postsSchema.findByIdAndUpdate({_id:posts._id},{$set:{status:"INACTIVE"}},{new:true})
               if(!inActPost){
                res.status(400).json({error:"Post Not Found"});
               }else{
                res.status(200).json({message:"Post Inactive Successfully"});

               }
 
            }
        } catch (err) {
            console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
        }
    });
router.post('/actPost',async(req,res)=>{
    try {
let postsSchemas= posts.schema;
let data = await postsSchemas.find({status:"ACTIVE"});
if(!data){
    res.status(400).json({error:"Data Not Found"});

}else{
    let schemaLength = Object.keys(data.paths).length;

    let count = schemaLength+1;
    if(!count){
        res.status(400).json({error:"Data Not Found"});
    }else{
        res.status(200).json(data,count);
    }

}
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});  
    } 
});

router.post('/inActPost',async(req,res)=>{
    try {
let postsSchemas= posts.schema;
let data = await postsSchemas.find({status:"INACTIVE"});
if(!data){
    res.status(400).json({error:"Data Not Found"});

}else{
    let schemaLength = Object.keys(data.paths).length;

    let count = schemaLength+1;
    if(!count){
        res.status(400).json({error:"Data Not Found"});
    }else{
        res.status(200).json(data,count);
    }

}
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});  
    } 
});
   
});



module.exports = router;