import { useState, useEffect } from 'react';
import axios from 'axios';
import redpc from '../../assets/redpc.jpg';
import './homepage.css';
import Navbar from '../../components/navbar/navbar';
const HomePage = () => {
    const[feauturedProducts, setFeaturedProducts] = useState([]);
    const getFeauturedProducts = async () => {
        const response = await axios.get('http://localhost:5000/products/featured');

        if (response.status === 200) {
            setFeaturedProducts(response.data);
        }
        console.log(response.data)
    }

    useEffect(() => {
        getFeauturedProducts();
    }, [])

    return (
        <>
            <Navbar />
            <div className='HomePageMain'>
                <img src={redpc} alt="" className='RedPC' />
                <p className='HomePageHeading'>Feautured Products</p>
            </div>
        </>
        
    )
}

export default HomePage;