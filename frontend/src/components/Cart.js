import React, { useContext } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { Present } from '../App';

const Cart = () => {

    let cartData = useCart();
    let cartDispatch = useDispatchCart();
    const {state} = useContext(Present);

    if(cartData.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-1'> The Cart is Empty !</div>
            </div>
        )
    }

    let totalPrice = cartData.reduce((total, item)=> parseInt(total) + parseInt(item.price), 0);

    const saveData = async ()=> {
        let email = localStorage.getItem("userEmail");
        const res = await fetch(`${process.env.REACT_APP_URL}/saveorder`, {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, order_data: cartData, order_date: new Date().toLocaleString()})
    });
    if (res.status === 200) {
        alert("Order has been placed")
        cartDispatch({type: "DROP"})
    }
};

  return (
    <>
    {state ? 
    
        <div className='container'>
            <div className="container m-auto mt-5 table-repsonsive table-repsonsive-sm table-repsonsive-md">
                <table className="table">
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map((item, index)=> {
                            return (
                                <tr className='text-light fs-5'>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price}</td>
                                    <button type='button' className='btn btn-danger ms-5' onClick={()=> {cartDispatch({type: "REMOVE", index: index})}}>Delete</button>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div className="btn bg-success mt-5 text-light fs-5" onClick={saveData} >Check Out</div>
            </div>
            </div>
        : ""}
    </>
  )
}

export default Cart;