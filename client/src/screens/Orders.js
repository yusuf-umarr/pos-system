import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Orders.css'

const Orders = () => {
    
    // const [toggle, setToggle] =useState('nshow')
    // const clickz = () =>{
    //     setToggle(toggle === 'show' ? 'nshow' : 'show'  ) //className = {toggle}
    // }   

    const [printz, setPrintz] = useState([ ])

    const getOrder = async() =>{
        try {
            const res = await axios.get("/auth/api/receipt/all")
            setPrintz(res.data)
        } catch (error) {
            console.log(error + "error fetching data");
        }
     }
    
    useEffect(()=>{
        getOrder()
    }, [ ])

    return (

        <div className="order__Box">
            {printz ? (
                <table>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        
                    </tr>
                    </thead>
                    {  printz && printz.map(x =>{
                        return (
                            <tbody  key={x._id}>
                        
                            {x.checkOut.map((item, i )=>(
                                <tr key={i}  className="cartScreen__tbody">
                                    
                                <td>{i + 1}</td>
                                <td>{item.product}</td>
                                <td>{item.qty}</td>
                                <td>${item.price}</td>
                                <td>${item.qty * item.price} </td>
                            </tr>
                            ))}
                            
                        
                        
                    </tbody>
                        )
                   
                    
})  }   

            </table>
            ) : <h1> No-sale </h1>}

        </div>
    )

    
    
}




export default Orders

