const { Router } = require("express");
const router = Router();
const zod = require('zod')
const jwt = require('jsonwebtoken');
const { User, Account } = require("../db");
const { authMiddleware } = require('../middleware')
const jwtpassword = 'sidharth123'



const signupBody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post('/signup',async(req,res) =>{
    const userValidation = signupBody.safeParse(req.body)
    if(!userValidation){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username
    })
    if(existingUser){
        res.status(411).json({ msg : "User aldready exist"})
    }

    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        
    })
    
    const userId = user._id

    await Account.create({
        userId,
        balance : 1+Math.random()*1000
    })

    const token = jwt.sign({userId},jwtpassword)
    
   
    res.header("Authorization", "Bearer " + token).json({ msg: "User created successfully" });


})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
})

router.post('/signin',async(req,res) =>{
    const signinData = req.body
   

    const sucess = signinBody.safeParse(signinData)
    if(!sucess){
        return res.status(411).json({msg : "Incorrect input"})
    }

    const user = await User.findOne({
        username : req.body.username,
        password  :req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId : user._id,
            
        },jwtpassword)
        return res.json({
            "token": token
        })
        
    }
    return res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.put('/',authMiddleware,async(req,res) =>{
    const success = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            msg :"error while updaing the data"
        })
    }
    await User.updateOne(
        {id : req.userId},
        {$set : req.body}
    )

   
})


router.get('/bulk',async(req,res)=>{
    const filterWord = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName : {
                "$regex" : filterWord
            }
        },{
            lastName : {
                "$regex" : filterWord
            }
        }
        ]
    })
    res.json({
        user : users.map(user =>({
            firstName : user.firstName,
            lastName : user.lastName,
            id : user._id
        }))
    })
})


router.get('/currentUser',authMiddleware,async(req,res) =>{
    const userId = req.userId
    const user = await User.findOne({_id : userId})
    return res.json({firstName : user.firstName})
})

module.exports = router