const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')

const Products = require('./models/Products') 

const PORT = process.env.PORT || 5005;

const connetDB = require('./connection/db')

connetDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/products', require('./routes/routes'))
app.use('/auth/api', require('./routes/auth'))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () =>{
    console.log(`Server ruuning on port ${PORT}`);
})
