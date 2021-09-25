
import * as actionTypes from './action'

export const productsReducer = (state = {products: []}, action) => {
   switch(action.type){
       case actionTypes.GET_PRODUCTS_REQUEST:
           return {
               loading : true,
               products: []
           }
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case actionTypes.GET_PRODUCTS_FAIL:
            return {
                loading : false,
                error: action.payload
            }
        default:
            return state
   }
}


export const getProductDetailsReducer = (state = { product: {}}, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return {
                loading: true
            }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                loading : false,
                product: action.payload
            }
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loading : false,
                error: action.payload
            }
        case actionTypes.GET_PRODUCT_DETAILS_RESET:
            return{
                product: {}
            }
        default: 
        return state
    }
} 


export const cartReducer = (state = { cartItems: []}, action ) => {
            // const item = action.payload;
            // const existItem = state.cartItems.find((x) => x._id === item._id);
    switch(action.type){
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x._id === item._id ? {...existItem, qty: existItem.qty + 1} : x)
                }
            } else {
                return {
                    ...state, cartItems: [...state.cartItems,  {...item, qty: 1}]
                }
            }

        case actionTypes.REMOVE_FROM_CART:
            // const items = action.payload;
            // const existItems = state.cartItems.find((x) => x._id === items._id);

            // if(existItems){
                return {
                    ...state, cartItems: state.cartItems.filter((x) => x._id !== action.payload)
                }
            // } 
            
            // if(existItems.qty === 1){
            //     return {
            //         ...state, cartItems: state.cartItems.filter((x) => x._id !== action.payload)
            //     }
            // } 
            // else {
            //     return {
            //         ...state,
            //         cartItems: state.cartItems.map((x) => x.id === items._id ? {...existItems, qty: existItems.qty - 1} : x)                }
            // }
            
        case actionTypes.CART_RESET:
            return {
                ...state, cartItems: []
            }

        default:
            return state
    }
}

export const AuthReducer = (state, action) =>{
    switch(action.type){
        case actionTypes.LOGIN_START:
            return{
                user: null,
                isFetching: true,
                error: false
            };
        case actionTypes.LOGIN_SUCCESS:
            return{
                user: action.payload,
                isFetching: false,
                error: false
            };
        case actionTypes.LOGIN_FAILURE:
            return{
                user: null,
                isFetching: false,
                error: action.payload
            };
            default:
                return state
    }
}

// const onRemove = (product) =>{
//     const exist = cartItems.find((item) => item._id === product._id )
//     if(exist.qty === 1){
//       setCartItem(cartItems.filter((item) => item._id !== product._id ))
//     } else{
//       setCartItem(cartItems.map(item => item._id === product._id ? {...exist, qty: exist.qty -1 } : item))
//     }
//     }
  