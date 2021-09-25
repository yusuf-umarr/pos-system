const express = require('express')
const router = express.Router()
const multer = require('multer')


const Products = require('../models/Products')
const Prints = require('../models/Prints')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './client/public/uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
   
})
var upload = multer({
    storage: storage
}).single('productImage')

//get all product
router.get('/', async (req, res) =>{
    try {
        const product = await Products.find()
        res.json(product)
    } catch (error) {
        res.status(400).json(`Error fetching Products: ${error}`)
    }
})


//add product
router.post('/add', upload,  async (req, res) =>{
    try {
        const newProduct = await new Products({
            product: req.body.product,
            price: req.body.price,
            productImage: req.file.originalname,
        })
        const products = await newProduct.save()
        res.status(201).send('Product save Successfully!')
    } catch (error) {
        res.status(400).send(`${error} Error saving Product`)
    }
   
})

//find Product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(400).send(`${error} Error retrieving!! product`)
    }
   
})

//find product by id and update
router.put('/printa/:id', upload, (req, res) =>{
    Products.findById(req.params.id)
    .then(product => {
        product.product = req.body.product;
        product.price = req.body.price;
        product.productImage = req.file.originalname;

        product
        .save()
        .then(() => res.json('Product updated successfully'))
        .catch(err => res.status(400).json('error 01'))
    })
    .catch(err => res.status(400).json('error 02'))

})


//delete product
router.delete('/:id', (req, res) => {
    Products.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Product deleted '))
    .catch(err => res.status(400).json('error deleting Product'))
})



router.post('/receipt', async (req, res)=>{
    
        try{
            // const newPrint = await new Prints({
            //     checkOut: req.body
            // })
            newPrint.checkOut= req.body;
    
            const print = await newPrint.save()
            res.status(201).send('Receipt saves Successfully!')
        }
     catch (error) {
        res.status(400).send(`${error} Error saving Receipt!!`)
    }
})



router.get("/friends/:userId", async (req, res) =>{
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId =>{
                return User.findById(friendId)
            })
        )
        let friendList = []
        friends.map(f =>{
            const {_id, username, profilePicture } = f;
            friendList.push({ _id, username, profilePicture })
        })
        res.status(200).json(friendList)
    } catch (error) {
       res.status(500).json(error) 
    }
})




// router.post('/update/:id', (req, res) =>{
//     let id = req.params.id;
//     Articles.findByIdAndUpdate(id, {
//         title: req.body.title,
//         article: req.body.article,
//         authorname: req.body.authorname,
//     }),(err, article)=>{
//         if(err){
//             res.status(400).send('error updating data')
//         }else{
//             res.status(200).send('updated successful')
//             }
//         }
// })

module.exports = router



