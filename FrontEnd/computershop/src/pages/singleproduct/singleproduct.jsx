import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import './singleproduct.css'
import {useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Carousel from "react-bootstrap/Carousel";
import { useAuthContext } from '../../hooks/useAuthContext';

const SingleProduct = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [products, setProduct] = useState({});
    const [subCategoryProducts, setSubCategoryProducts] = useState([]);
    const {productid} = useParams();
    const [quantity, setQuantity] = useState(1);
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/products/single/${productid}`);
            console.log(response)
            if (response.status == 404) {
                navigate('/homepage')
            }
            if (response.status === 200) {
                setProduct(response.data);
                const subCategoryResponse = await axios.get(`http://localhost:5000/products/subcategory/${response.data.subcategoryId}`);
                if (subCategoryResponse.status === 200) {
                    setSubCategoryProducts(subCategoryResponse.data);
                }
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            navigate('/homepage')
        }
    }
    
    const handleAddToCart = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/cartproducts/add`, {ProductId: productid, quantity: quantity, UserId: user.id });
            if (response.status === 200) {
                alert("Product added to cart");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            <Navbar/>
            <div className="singleproductMain bg-black min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
                <div className='singleproductInfo d-flex'>
                    <img src={`http://localhost:5000/uploads/${products.image}`} alt="" className="singleproduct__image"/>
                    <div className="singleproduct__info">
                        <p className="singleproduct__name">{products.name}</p>
                        <p className="singleproduct__price">Price: {products.price}$</p>
                        <p className="singleproduct__description">Description : {products.description}</p>
                        <TextField
                            type="number"
                            label="Quantity :"
                            defaultValue="1"
                            className='input__quantity'
                            value={quantity}
                            onChange={(e) => {setQuantity(products.quantity > e.target.value ? e.target.value : products.quantity); const newQuantity = e.target.value;
                                (newQuantity > 0 && newQuantity <= products.quantity) ? setQuantity(newQuantity) : setQuantity(1)}}
                            InputLabelProps={{
                                shrink: true,
                                style: { color: 'red' },
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                style: { color: 'white' },
                            }}
                            min="1"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="decrease quantity"
                                    onClick={() => {
                                        setQuantity(quantity > 1 ? quantity - 1 : 1);
                                    }}
                                    style={{ color: 'red' }}
                                    >
                                    <RemoveIcon />
                                    </IconButton>
                                    <IconButton
                                    aria-label="increase quantity"
                                    onClick={() => {
                                        setQuantity(parseInt(products.quantity > quantity ? quantity + 1 : products.quantity ));
                                    }}
                                    style={{ color: 'green' }}
                                    >
                                    <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                                ),
                                style: { color: 'white' },
                            }}
                        />
                        <button className="codepen-button" onClick={handleAddToCart}><span>Add to Cart</span></button>
                    </div>
                </div>
                <Footer/>
            </div>

        </>
    )
}

export default SingleProduct;