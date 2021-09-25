import './HomeScreen.css';
import Product from '../components/Product'
import { useEffect, useContext } from 'react';
import ProductContext from '../context/productContext';
import CartScreen from './CartScreen';

const HomeScreen = ( ) => {

        const { getProducts,  productsState} = useContext(ProductContext)

        const { products, loading, error } = productsState

        useEffect(() =>{
            getProducts()
        }, [ ])

    return (
        <div className="homescreen">
           <div className="homeTop">
                <p className="homescreen__ticket ">Ticket</p>
                <p className="homescreen__title ">All goods</p>
           </div>

            <div className="homescreen_div">
                <div className="basket">
                    <CartScreen />
                </div>
                <div  className="homescreen_products">
                    {loading ? <h2>Loading...</h2> : error ? <h2>{error + "Please Refresh"}</h2>: 
                    products.map((product) =>{
                        return(
                            <Product key={product._id} product={product}  />
                        )
                    })
                    }            
                   
                </div>
                
            </div>
        </div>
    )
}

export default HomeScreen


