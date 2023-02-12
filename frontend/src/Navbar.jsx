import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useContext, useState } from 'react';
import Modal from './Modal';
import Cart from './components/Cart'
import { useCart } from './components/ContextReducer'; 
import Button from 'react-bootstrap/esm/Button';
import { Present } from './App';

function BasicExample() {

  let activeStyle = {
    textDecoration: "underline",
  }

  const {state, dispatch} = useContext(Present);
  
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  const logoutUser = ()=> {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      dispatch({type: "PRESENT", payload: false})
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className=' fs-3 fw-bold fst-italic logo'>User App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
          <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/home'><Button className='button btn-light fw-bold mx-1 text-primary'> Home </Button></NavLink>
            {state ? <>
                <NavLink className='link mx-1' to='/products'><Button className='button btn-light fw-bold text-primary'>Products</Button></NavLink>
                <NavLink className='link mx-1' to='/products' onClick={()=> setCartView(true)}><Button className='button btn-light fw-bold text-primary'>  Cart {data.length === 0 ? '': <Badge pill bg="danger">{data.length}</Badge> }</Button></NavLink>
                {cartView ? <Modal onClose={()=> setCartView(false)} > <Cart /> </Modal>: null}
                <NavLink className='link mx-1 text-danger' to='/' onClick={logoutUser}><Button className='button btn-light fw-bold text-danger'> Logout </Button></NavLink>
            </>
                :<>
                <NavLink className='link mx-1 text-danger' to='/'><Button className='button btn-light fw-bold text-primary'> Register </Button></NavLink>
                <NavLink className='link mx-1 text-danger' to='/login'><Button className='button btn-light fw-bold text-success'> Login </Button></NavLink>
                </>
             }
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;