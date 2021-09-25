import React, {useReducer} from 'react'
import ProductContext from './productContext'
import * as actionTypes from './action'

import { AuthReducer, productsReducer, getProductDetailsReducer, cartReducer} from './productsReducer'
import axios from 'axios'

const State = (props) => {
    const initialState = {
        user: {
            _id:"614c3a7226f20607285bcbfb",
            username:"yusuf",
            email:"yo@gmail.com",
            password: "$2b$10$MH4OGyCvdJoMHJT3HCSD4eRNTkVwQOPAeiDv/k7Drab0xMrNLf3Ti",
            checkOut: [],
            
        },
        isFetching: false,
        error: false
    }

    const [cartState, cartDispatch] = useReducer(cartReducer, {cartItems: []})

    const [productsState, productsDispatch] = useReducer(productsReducer, { products: []})
    const [producDetailtState, productDetailDispatch] = useReducer(getProductDetailsReducer, { product: []})

    const [loginState, loginDispatch] = useReducer(AuthReducer, initialState)


    //login
    const loginCall = async (userCredential, dispatch) =>{
        try {
            loginDispatch({
            type: actionTypes.LOGIN_START   
        })
        
            const res = await axios.post("auth/login", userCredential )
            loginDispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            loginDispatch({
                type: actionTypes.LOGIN_FAILURE,
                payload: error
            })
        }

    }

     //add to cart
     const addToCart = async (id) =>{ 
        const {data} = await axios.get(`/products/${id}`)

        cartDispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                _id: data._id,
                product: data.product,
                price: data.price,
                productImage: data.productImage,
                

            }
        })
        localStorage.setItem('cart', JSON.stringify(data))
    }

    //remove from cart
    const removeFromCart = (id) =>{
        cartDispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: id
        })
        // localStorage.setItem('cart', JSON.stringify(data))

    }

    //cart reset
    const cartReset = () =>{
        cartDispatch({
            type:actionTypes.CART_RESET
        })
    }

    const getProducts = async () =>{
        try {
            productsDispatch({type: actionTypes.GET_PRODUCTS_REQUEST})

            const {data} = await axios.get('/products')

            productsDispatch({
                type: actionTypes.GET_PRODUCTS_SUCCESS,
                payload: data
            })
            
        } catch (error) {
            productsDispatch({
                type: actionTypes.GET_PRODUCTS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
            
        }
    }

    
    const getProductDetails = async (id) =>{
        try {
            productDetailDispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST})

            const {data} = await axios.get(`/products/${id}`)

            productDetailDispatch({
                type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
                payload: data
            })
            
        } catch (error) {
            productDetailDispatch({
                type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
            
        }
    }


    const removeProductDetails = () => {
        productDetailDispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_RESET,
            payload: ""
        })
    }

    return (
        <ProductContext.Provider value={{
            loginCall,
            addToCart,
            removeFromCart,
            getProducts,
            getProductDetails,
            removeProductDetails,
            cartDispatch,
            productsDispatch,
            cartReset,
            productsState,
            producDetailtState,
            cartState,
            user:loginState.user,
            isFetching: loginState.isFetching,
            error: loginState.error,
        }}>

            {props.children}
            
        </ProductContext.Provider>
    )
}

export default State
