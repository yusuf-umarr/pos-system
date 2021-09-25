import React, { useState } from 'react'
import './AddProductScreen.css'
import axios from 'axios'
import { Redirect } from 'react-router'
const AddProductScreen = () => {
    const [product, setProduct] = useState('')
    const [price, setPrice] = useState('')
    const [fileName, setFileName] = useState('')

    

    const onSubmit =async (e) =>{ 
        e.preventDefault();
        const formData = new FormData()
        
        formData.append('productImage', fileName);
        formData.append('product', product); 
        formData.append('price', price); 
        try {
             await axios.post('/products/add', formData )
        setPrice('');
        setProduct('');
        setFileName('');
        
        alert('product add successfully!');
        <Redirect to="/" />  
                
        } catch (err) {
            if(err.response.status === 500){
                alert('There was a problem with the server');
            } else{
                alert('error, please fill the required filed');
            }
        }
        

    }

    const onChangeFile = e =>{
        setFileName(e.target.files[0])
    }

    return (
        <div className="add_form">
              <form encType="multipath/form-data" onSubmit={onSubmit} >       
              
            <div className="mb-3">
                 <label className="form-check-label" htmlFor="exampleCheck1">Product Name</label>
                <input value={product} type="text" placeholder='Product' className="form-control" onChange={e => setProduct(e.target.value) }></input>
                
            </div>   
            <div className="form-group">
                <label className="form-check-label" htmlFor="exampleCheck1">Price</label>
                <input value={price} type="text" placeholder='Price' className="form-control" onChange={e => setPrice(e.target.value)}></input>
                
            </div>        
            
            <div className="form-group">
                 <label className="form-check-label" htmlFor="exampleCheck1">Select Image</label>
                <input filename="productImage" type="file" className="form-control" onChange={onChangeFile }></input>
                
            </div> 
            <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Add Product</button>
            </div>
            
            
        </form>
        </div>
    )
}

export default AddProductScreen
