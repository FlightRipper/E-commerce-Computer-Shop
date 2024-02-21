import { useState, useEffect } from 'react';
import axios from 'axios';
import redpc from '../../assets/redpc.jpg';
import './homepage.css';
import Navbar from '../../components/navbar/navbar';
import FeaturedCard from '../../components/feauturedCard/featuredCard';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]); // Corrected variable name

    const getFeaturedProducts = async () => { // Corrected function name
        const response = await axios.get('http://localhost:5000/products/featured');

        if (response.status === 200) {
            setFeaturedProducts(response.data);
        }
        console.log(response.data)
    }

    useEffect(() => {
        getFeaturedProducts();
    }, [])

    return (
        <>
            <Navbar />
            <div className='HomePageMain'>
                <img src={redpc} alt="" className='RedPC' />
                <p className='HomePageHeading'>Featured Products</p>
                <div className='HomePageFeauturedProducts'>
                    {featuredProducts.map((product) => (
                        <button style={{border: 'none', outline: 'none', background: 'none'}}>
                        <FeaturedCard
                            image={product.image}
                            price={product.price}
                            title={product.name}
                            description={product.description}
                        />
                        </button>
                    ))}
                </div>
                <div className='HomePageFooter'>
                    <p className='HomePageFooterText'>© 2023 TechTrove. All rights reserved.</p>
                    <p className='HomePageFooterText'>Privacy Policy | Terms of Service</p>
                    <p className='HomePageFooterText'>Powered by TechTrove</p>
                </div>
            </div>
        </>
        
    )
}

export default HomePage;