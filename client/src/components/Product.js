import React, { useContext } from 'react'
// import { CircularProgress} from '@material-ui/core'
import productContext from '../context/productContext'
import './Product.css'

const Product = ({ product,  }) => {

    const { addToCart} = useContext(productContext)


    const onAdd =(_id) =>{
        addToCart(_id)
    }
   
    return (
        <div className="product" onDoubleClick={() => onAdd(product._id)}> 
            <img src={`/uploads/${product.productImage}`}  alt="..." /> 
            <div className="product__info">
                <p className="info__name">{product.product}</p>

                <p className="info__price">${product.price}</p>
            </div>
            
        </div>
    )
}

export default Product


