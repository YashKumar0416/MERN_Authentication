import React, { createContext, useReducer } from 'react';
import "./App.css";
import { Routes ,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from './components/Register';
import Navbar from './Navbar';
import { initialState, reducer } from './UserContext';
import Products from './components/Products';
import { CartProvider } from './components/ContextReducer';

export const Present = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <Present.Provider value={{state, dispatch}}>

      <CartProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </CartProvider>
    </Present.Provider>
    </>
  )
}

export default App;