const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


const Products = require('../models/Products')
const User = require('../models/User')
const Prints = require('../models/Prints')


router.post('/register', async (req, res) =>{
    
    try {
        //encode the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error + 'error savin data')
    }
} );




//add Receipt
router.put('/receipt/:id', async (req, res)=>{
    try {
        const user = await  User.findById(req.params.id)
        if(user){
            await user.updateOne({ $push: { checkOut: req.body }})
            res.status(201).send('Successfully!')
        }else{
            res.status(403).json('you cant update up!!!')
        }
    }  
     catch (error) {
        res.status(400).send(`${error} Error saving Receipt!!`)
    }
})
router.post('/', async (req, res)=>{
    
    try{
        const newPrint = await new Prints({
            checkOut: req.body
        })
        // newPrint.checkOut= req.body;

        const print = await newPrint.save()
        res.status(201).send('Receipt saves Successfully!')
    }
 catch (error) {
    res.status(400).send(`${error} Error saving Receipt!!`)
}
})

//get all receipt
router.get('/receipt/all', async (req, res) => {
    try {
        
        const user = await User.find({}, {"checkOut":1})
        
        res.status(200).json( user)
    } catch (error) {
        res.status(500).json(`Error fetching data!!! ${error}`)
    }
})


module.exports = router