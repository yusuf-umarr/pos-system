import React, { useState } from 'react'
import './AddProductScreen.css'
import axios from 'axios'
const AddProductScreen = (props) => {
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [fileName, setFileName] = useState('')
    const [message, setMessage] = useState('')

    


    const changeOnclick =async (e) =>{ //submitt btn
        e.preventDefault();
        const formData = new FormData()

        formData.append('productImage', fileName);
        formData.append('product', product); 
        formData.append('description', description); 
        formData.append('price', price); 
        try {
            const res = await axios.post('/products/add', formData, {
                
            }
         )
         setMessage('File uploaded')          
        } catch (err) {
            if(err.response.status === 500){
                setMessage('There was a problem with the server');
            } else{
                setMessage(err.response.data.msg);
            }
        }

    }

    const onChangeFile = e =>{
        setFileName(e.target.files[0])
    }

    return (
        <div className="add_form">
            <h1>Update Product</h1>
              <form encType="multipath/form-data" onSubmit={changeOnclick} >       
              
            <div className="mb-3">
                 <label className="form-check-label" htmlFor="exampleCheck1">product</label>
                <input value={product} type="text" className="form-control" onChange={e => setProduct(e.target.value) }></input>
                
            </div>   
            <div className="form-group">
                <label className="form-check-label" htmlFor="exampleCheck1">price</label>
                <input value={price} type="text" className="form-control" onChange={e => setPrice(e.target.value)}></input>
                
            </div> 

              
            <div className="form-floating">
                <textarea value={description} onChange={e => setDescription(e.target.value) } className="form-control" placeholder="Leave a comment here" id="floatingTextarea" ></textarea>
                <label htmlFor="floatingTextarea" >description</label>
            </div>  
            <div className="form-group">
                 <label className="form-check-label" htmlFor="exampleCheck1">Select Image</label>
                <input filename="productImage" type="file" className="form-control" onChange={onChangeFile }></input>
                
            </div> 
            <div class="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Add Product</button>
            </div>
            
            
        </form>
        </div>
    )
}

export default AddProductScreen
