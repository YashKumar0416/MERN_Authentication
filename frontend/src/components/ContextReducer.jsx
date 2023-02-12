import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action)=> {
    switch(action.type) {
        case "ADD":
            return [...state, {id: action.id, name: action.name,
                price: action.price, qty: action.qty}]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((item, index)=> {
                if (item.name === action.name) {
                    arr[index] = {...item, qty: parseInt(action.qty)+item.qty, price: parseInt(action.price)+parseInt(item.price)}
                    return arr;
                }
            })
            return arr
        case "DROP":
            let emptyArr = []
            return emptyArr;
        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({children})=> {

    const [state, dispatch] = useReducer(reducer, []);
    
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = ()=> useContext(CartStateContext);
export const useDispatchCart = ()=> useContext(CartDispatchContext);