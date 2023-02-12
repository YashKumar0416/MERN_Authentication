import React, { useContext, useEffect } from 'react';
import { Present } from '../App';

const Home = () => {

  const { state, dispatch } = useContext(Present);

  useEffect(()=> {
    if(localStorage.getItem("authToken")) {
      dispatch({type:"PRESENT", payload: true})
    }
  }, []);
  
  return (
    <>
    {state ? 
      <div className="main_container">
        <h1>Welcome Back</h1>
        <h2 className='text-info'>{localStorage.getItem("userName")}</h2>
        </div>
        : <div className="main_container">
        <h1>Welcome To my App</h1>
        </div>
      }
    </>
  )
}

export default Home;