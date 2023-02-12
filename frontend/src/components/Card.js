import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Present } from '../App';
import { useCart, useDispatchCart } from './ContextReducer';

const Card = ({itemdata}) => {

    const [data, setData] = useState([]);
    const {state} = useContext(Present);
    let qty = 1;

    let cartDispatch = useDispatchCart();
    let cartData = useCart();

    const getData = async ()=> {
        
        const res = await fetch(`${process.env.REACT_APP_URL}/products`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
        });
        const json = await res.json();

        if(res.status === 200) {
            setData(json.data)
        } else {
            // console.log("No data")
        }
    }

    const addToCart = async ()=> {
        let items = [];
        for (let item of cartData) {
            if(item.name === itemdata.name) {
                items = item;
                break;
            }
        }
        if (items !== []) {
            if (items.name === itemdata.name) {
                await cartDispatch({type: "UPDATE", id: itemdata._id, name: itemdata.name, price: itemdata.price, qty: qty })
            } else {
                await cartDispatch({type: "ADD", id: itemdata._id, name: itemdata.name, price: itemdata.price, qty: qty })
                return
            }
        } else {
            await cartDispatch({type: "ADD", id: itemdata._id, name: itemdata.name, price: itemdata.price, qty: qty })
            return
        }
    };

    useEffect(()=> {
        getData();
    }, [data]);

  return (
    <>
    {state ? 
            <div className="container">

            <Container>
                    <Row className='justify-content-md-center'>
                        <Col md-auto className='m-2 p-2 border border-info rounded m-2'>
                            <div className="container d-flex justify-content-between ">
                                <img src={itemdata.img} className='rounded border border-warning' style={{ width: '180px'}} alt="" srcset="" />
                                <div className='d-flex flex-column justify-content-around'>
                                    <div> <span className='fw-bold fs-5'> Name: </span> {itemdata.name}</div>
                                    <div> <span className='fw-bold fs-5'> Processor: </span> {itemdata.processor}</div>
                                    <div> <span className='fw-bold fs-5'> Ram:  </span> {itemdata.ram}</div>
                                    <div> <span className='fw-bold fs-5'> Storage:  </span> {itemdata.storage}</div>
                                </div>
                                <div className='mt-4'>
                                    <span className=' fs-4 fw-bold'> Price:
                                    </span> 
                                    <div className='text-success fw-bold'>{itemdata.price}/-</div>
                                </div>
                                <div className='mt-5'>
                                    <Button onClick={addToCart}>Add to Cart</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
            </Container> 
            </div>
    : ''}
    </>
  )
}

export default Card;