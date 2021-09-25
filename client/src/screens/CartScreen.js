import './CartScreen.css';
import { useContext, useEffect, useState} from 'react';
import productContext from '../context/productContext';
import axios from 'axios'


const CartScreen = () => {
    const { user, cartState, removeFromCart, cartReset} = useContext(productContext)
    const { cartItems } = cartState
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)
    const totalPrice = itemsPrice
   
    const orderNo = Math.floor(Math.random() * 10000 ) + 10


    var c = new Date().toISOString().slice(11, 16);
    var b = new Date().toString().slice(0, 4);

    const order = `${b}/${c}/${orderNo}  `
      

    const [effectInput, setEffectInputs] = useState([ ])

    useEffect(()=>{
        setEffectInputs(cartItems)
    }, [cartItems])


      const changeHandler = (_id) => event => {
        const { name, value } = event.target;
        setEffectInputs(input => input.map((el) => el._id === _id 
          ? {
              ...el,
              [name]: value,
            }
          : el,
        ));
      };


    const submitForm = (e) =>{
        e.preventDefault();
        alert('Success')
        let printOut = effectInput

        console.log({printOut:printOut});
        try {
            axios.put("/auth/api/receipt/" + user._id, printOut)
        } catch (error) {
            console.log(error);
        }
        cartReset()
    }
          const onRemove = (_id ) =>{
            removeFromCart(_id)
          }
    return (
       <>
        
       {!totalPrice ? <p>No Item Selected</p> : (
        <form className="cartscreen" onSubmit={submitForm}>
            <div className="cartscreen__left">
                    <div className="cartItem__con ">

                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Del</th>
                                </tr>
                            </thead>
                            {effectInput.map(input =>(

                            
                            <tbody key={input._id} className="cartScreen__tbody">
                                <tr>
                                    <td>
                                        <input name='product' value= {input.product} onChange={changeHandler(input._id)} className='priceNqty item'/>
                                    </td>
                                    <td>
                                        <input type="text" name='price' value={input.price} onChange={changeHandler(input._id)} className='priceNqty'/>
                                    </td>
                                    <td>
                                        <input className='priceNqty' name="qty" placeholder={input.qty} onChange={changeHandler(input._id)} />
                                    </td>
                                    
                                    <td>
                                        <i onClick={() =>onRemove(input._id)} className="fas fa-trash trash"></i>
                                    </td>
                                </tr>
                            </tbody>
                            ))}
                        </table>

                        
                        
                    </div>
                   
            </div>
            <div className="cartscreen__right">
                
                    
                <div className="cartscreen__info">
                        <p>Order: 
                            <input className='priceNqty item-order' type="text" placeholder={order} /> 
                        </p>
                        <p>Total Price: $
                            <input className='priceNqty item-order' type="text" placeholder={totalPrice} /></p> 
                </div>
                <div>
                    <button className="button" style={{color : 'black'}}>Print Receipt</button>
                </div>
                
            </div>
            
            
        </form>
       )}
    
                                
       </>
        
    )
}

export default CartScreen
