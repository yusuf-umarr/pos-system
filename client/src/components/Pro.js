import React, { useContext, useState } from 'react'
import productContext from '../context/productContext';

const Pro = () => {

    const {  cartState} = useContext(productContext)


    const { cartItems } = cartState
    

    const myArr= [
        {product: 'egg', price: 5, id:0},
        {product: 'cake', price: 3, id:1}
    ]

    console.log({cartItems:cartItems})

    const [input, setInput] = useState( cartItems)


      const changeHandler = (id) => event => {
        const { name, value } = event.target;
        setInput(input => input.map((el) => el.id === id
          ? {
              ...el,
              [name]: value,
            }
          : el,
        ));
      };


      

    const submitForm = (e) =>{
        e.preventDefault();
        
        // JSON.stringify('input', input)

        let printOut = 
            {
                product: input,
                // price: input.price          
            }
        // console.log({myinput:input})
        console.log({print:printOut});
        // try {
        //     axios.post('/products/print', printOut)
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <>
            <form onSubmit={submitForm}>
            {input.map(x=>(
                <div key={x.id}>
                    <input name='product' value= {x.product} onChange={changeHandler(x.id)}  />
                    <input name='price' value= {x.price} onChange={changeHandler(x.id)} />
                    
                </div>
            ))}
            <input type="submit" value="Submit" />
            </form>
            <div>
            </div>
        </>
    )
}

export default Pro
