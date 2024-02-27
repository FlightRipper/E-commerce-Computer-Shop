import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [cartItems, setCartItems] = useState([]);

    const TotalPrice = cartItems.reduce((accumulator, item) => {
        return accumulator + (parseInt(item.price,  10) * item.quantity);
    },  0);
    const fetchCartItems = async () => {
        const response = await axios.get(`http://localhost:5000/orders/getactive/${user.id}`);
        if (response.status === 200) {
          setCartItems(response.data);
          console.log(response.data);
        }
    }

    useEffect(() => {
        fetchCartItems();
    }, []);

    const removeItem = async (id) => {
        console.log(id);
        const response = await axios.delete(`http://localhost:5000/cartproducts/delete/${id}`);
        if (response.status === 200) {
            fetchCartItems();
            setCartItems(cartItems.filter(item => item.cartID !== id));
        }
    }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity,  0);

  return (
    <>
        <Navbar/>
        <div className="containerCart min-vh-100 w-100 d-flex align-items-center justify-content-center flex-column bg-black">
        <div className="card">
            <div className="card-header">
            <h2>Shopping Cart</h2>
            </div>
            <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered m-0">
                <thead>
                    <tr>
                    <th className="text-center py-3 px-4" style={{ width: '200px' }}>Product Name &amp; Details</th>
                    <th className="text-right py-3 px-4" style={{ width: '100px' }}>Price</th>
                    <th className="text-center py-3 px-4" style={{ width: '120px' }}>Quantity</th>
                    <th className="text-right py-3 px-4" style={{ width: '100px' }}>Total</th>
                    <th className="text-center align-middle py-3 px-0" style={{ width: '40px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                    <tr key={item.cartID}>
                        <td className="p-4">
                        <div className="media align-items-center d-flex">
                            <img src={`http://localhost:5000/uploads/${item.image}`} className=" imagecartclass d-block ui-w-40 ui-bordered mr-4" alt="" />
                            <div className="media-body">
                            <a href="#" className="d-block text-dark" onClick={() => navigate(`/singleproduct/${item.id}`)}>{item.name}</a>
                            <small>
                                <span className="text-muted">{item.description} </span>
                            </small>
                            </div>
                        </div>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">${item.price}</td>
                        <td className="align-middle p-4">
                        {item.quantity}
                        </td>
                    <td className="text-right font-weight-semibold align-middle p-4">${(parseInt(item.price,  10) * item.quantity)}</td>
                        <td className="text-center align-middle px-0">
                        <a href="#" className="shop-tooltip close float-none text-danger" title="" onClick={() => removeItem(item.cartID)}>×</a>
                        </td> 
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
                <div className="d-flex ">
                <div className="text-right mt-4 ">
                    <label className="text-muted font-weight-normal m-0">Total price</label>
                    <div className="text-large"><strong>${TotalPrice}</strong></div>
                </div>
                </div>
            </div>
            <div className="float-right buttonsCart">
                <button type="button" className="btn btn-lg btn-success md-btn-flat mt-2 mr-3" onClick={() => navigate('/homepage')}>Back to shopping</button>
                <button type="button" className="btn btn-lg btn-primary mt-2">Checkout</button>
            </div>
            </div>
        </div>
        <Footer />
        </div>
    </>
  );
};

export default ShoppingCart;