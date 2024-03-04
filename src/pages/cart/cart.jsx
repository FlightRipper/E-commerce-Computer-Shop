import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../components/loader/loader';


const ShoppingCart = () => {

    const API_KEY = "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";
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [cartItems, setCartItems] = useState([]);
    const [cartItemNames, setCartItemNames] = useState("");
    const [sentiment, setSentiment] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleask() {
        
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTBlOGQ5YWUtMmExNC00YTA1LTgzZWMtMWY0ZThhMDczMDIwIiwidHlwZSI6ImFwaV90b2tlbiJ9.DoMaXPi7Sd7I-LpzwNQ4bd7Sd7r_4rtT1aGziC03uSs'
            },
            body: JSON.stringify({
                response_as_dict: true,
                attributes_as_list: false,
                show_original_response: false,
                temperature: 0,
                max_tokens: 1000,
                providers: 'google',
                text: cartItemNames, // You might want to replace this static text with dynamic content
                chatbot_global_action: 'You are a helpful assistant'
            })
        };
    
        try {
            setLoading(true);
            const response = await fetch('https://api.edenai.run/v2/text/chat', options);
            const data = await response.json();
            setLoading(false);
            console.log(data.google.generated_text);
            const result = await Swal.fire({
                title: "Are they compatible?",
                text: data.google.generated_text,
                icon: "question",
              });
            // Assuming you want to set the sentiment or some other state based on the response
            // Swal.fireEvent(data.google.generated_text); // This line might need adjustment based on the actual response structure
        } catch (error) {
            console.error(error);
        }
    }
    // const handleask = async (e) => {
    //     try {
    //         const prompt = cartItemNames
    //         if (cartItems.length === 0) {
    //             return Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: "Something went wrong!",
    //                 footer: 'Cart is empty'
    //               });;
    //         }
    //         const response = await axios.post(`http://localhost:5000/openai`, { prompt });
    //         Swal.fireEvent(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    const TotalPrice = cartItems.reduce((accumulator, item) => {
        return accumulator + (parseInt(item.price,  10) * item.cartQuantity);
    },  0);
    const fetchCartItems = async () => {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/orders/getactive/${user.id}`);
        console.log(response)
        if (response.status === 200) {
          setLoading(false);
          setCartItems(response.data);
          console.log(response.data);
        }
    }

    const updateStatus = async () => {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Confirm Sending order",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, confirm it!"
        });
      
        if (result.isConfirmed) {
            try {
                console.log(cartItems);
                setLoading(true);
                const response = await axios.patch(`http://localhost:5000/orders/status/${cartItems[0].orderID}`, { status: 'pending' });
                if (response.status === 200) {
                setLoading(false);
                fetchCartItems();
                Swal.fire({
                    title: "Success!",
                    text: "Your order has been placed.",
                    icon: "success"
                });
                navigate('/homepage');
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }
    }

    useEffect(() => {
        fetchCartItems();
        setCartItemNames(cartItems.map(item => item.name).join(", ") + " are they compatible");
    }, []);

    const removeItem = async (id) => {
        console.log(id);
        const response = await axios.delete(`http://localhost:5000/cartproducts/delete/${id}`);
        if (response.status === 200) {
            fetchCartItems();
            setCartItems(cartItems.filter(item => item.cartID !== id));
        }
    }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.cartQuantity,  0);

  return (
    <>
    {loading ? (<Loader />) : (
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
                    <th className="text-center py-3 px-4" style={{ width: '50px' }}>Product Name &amp; Details</th>
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
                            <img src={`http://localhost:5000/uploads/${item.image}`} className=" imagecartclass d-block ui-w-20 ui-bordered mr-4" alt="" />
                            <div className="media-body">
                            <a href="#" className="d-block text-dark" onClick={() => navigate(`/single/${item.id}`)}>{item.name}</a>
                            <small>
                                <span className="text-muted">{item.description} </span>
                            </small>
                            </div>
                        </div>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">${item.price}</td>
                        <td className="align-middle p-4">
                        {item.cartQuantity}
                        </td>
                    <td className="text-right font-weight-semibold align-middle p-4">${(parseInt(item.price,  10) * item.cartQuantity)}</td>
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
                <button type="button" className="btn  btn-success cartbuttons" onClick={() => navigate('/homepage')}>Back to shopping</button>
                <button type="button" className="btn  btn-success cartbuttons" onClick={handleask}>Check Compatiblity</button>
                <button type="button" className="btn  btn-primary cartbuttons" onClick={updateStatus}>Checkout</button>
            </div>
            </div>
        </div>
        <Footer />
        </div>
        </>
    )}
    </>
  );
};

export default ShoppingCart;