import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import { Present } from "../App";


const Login = () => {

    const [userdata, setUserdata] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const {dispatch} = useContext(Present);


    //LOGIN USER
    const saveData = async (e)=> {
        e.preventDefault();

        const {email, password} = userdata;

        if(!email || !password) {
            alert("Enter Details")
        }else if (password.length < 5) {
            alert("Min Password Length: 5")
        } else {
            
            const res = await fetch(`${process.env.REACT_APP_URL}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userdata.email,
                password: userdata.password})
        });
        const json = await res.json();

        if(res.status === 200) {
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("userName", json.prevuser.name);
            localStorage.setItem("userEmail", json.prevuser.email);
            if(localStorage.getItem("authToken")) {
                dispatch({type: "PRESENT", payload: true})
            }
            navigate('/home', {state: email})
        } else if(res.status === 401) {
            alert("Enter Valid OTP")
        } else {
            alert("Error Occured")
        }
    }
    };

    const handleInputs = (e)=> {
        const name = e.target.name;
        const value = e.target.value;

        setUserdata({...userdata, [name]: value})
    };

  return (
    <>
        <div className="main_container">
            <div className="container text-center w-100">
                <h2 className='m-4'>Login Here</h2>
                <div className="container w-25 border border-info p-3 rounded-2 bg-light fs-5 h-50">
                <Form method='POST'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' required='true' onChange={handleInputs} value={userdata.email} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' required='true' onChange={handleInputs} value={userdata.password} placeholder="Password" />
                    </Form.Group>
                    <Form.Group className='mt-4 mx-auto container'>
                    <Button variant="success" onClick={saveData} className='fw-bold w-100 text-light mb-1' type="submit">
                        Login
                    </Button>
                    <NavLink to='/' className=''>
                        <Button variant="primary" className='fw-bold w-100 text-light' type="submit">New Register</Button>
                    </NavLink>
                    </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login;