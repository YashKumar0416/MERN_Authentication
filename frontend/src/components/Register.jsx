import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {

    const [userdata, setUserdata] = useState({name:'', email: '', password: ''});
    const navigate = useNavigate();

    //REGISTER USER
    const saveData = async (e)=> {
        e.preventDefault();
        const {name, email, password} = userdata;
        let date = new Date();

        if(!name || !email || !password) {
            alert("Enter Details")
        }else if (password.length < 5) {
            alert("Min Password Length: 5")
        } else {
            
            const res = await fetch(`${process.env.REACT_APP_URL}/newuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password,date})
            });

            if(res.status === 200) {
                setUserdata({name:'', email: '', password: ''})
                alert("User registered successfully")
                navigate('/login');
            }else {
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
        <h2 className='mb-3'>Register Here</h2>
        <div className="border border-info p-3 rounded-2 bg-light fs-5">
            <Form method='POST' onSubmit={saveData}>
            <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='name' onChange={handleInputs} required='true' value={userdata.name} placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' onChange={handleInputs} required='true' value={userdata.email} placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share with anyone.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' onChange={handleInputs} required='true' value={userdata.password} placeholder="Password" />
            </Form.Group>
            <Form.Group className='d-inline mt-5 p-0'>
                <div className="container">
                <Button variant="success" className='w-100 fw-bold text-light' type="submit">
                    Register
                </Button>
                </div>
                <div className="container mt-2">
                <NavLink to='/login'>
                    <Button variant="primary" className='w-100 fw-bold text-light'>User Already</Button>
                </NavLink>
                </div>
            </Form.Group>
            </Form>
        </div>
    </div>
    </>
  )
}

export default Register;
