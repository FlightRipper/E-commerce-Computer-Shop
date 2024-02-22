import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import './singleproduct.css'
const SingleProduct = () => {
    const [products, setProduct] = useState({});
    const [subCategoryProducts, setSubCategoryProducts] = useState([]);
    const {productid} = useParams();
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/products/single/${productid}`);
            if (response.status === 200) {
                setProduct(response.data);
                const subCategoryResponse = await axios.get(`http://localhost:5000/products/subcategory/${response.data.subcategoryId}`);
                if (subCategoryResponse.status === 200) {
                    setSubCategoryProducts(subCategoryResponse.data);
                }
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

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
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default SingleProduct;