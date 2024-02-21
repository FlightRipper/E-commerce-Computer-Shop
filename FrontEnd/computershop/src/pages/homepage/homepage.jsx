import { useState, useEffect } from 'react';
import axios from 'axios';
import redpc from '../../assets/redpc.jpg';
import './homepage.css';
import Navbar from '../../components/navbar/navbar';
import FeaturedCard from '../../components/featuredCard/featuredCard'; // Corrected import statement

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
                <p className='HomePageHeading'>Featured Products</p> {/* Corrected heading text */}
                <div className='HomePageFeaturedProducts'> {/* Corrected class name */}
                    {featuredProducts.map((product) => (
                        <FeaturedCard
                            image={product.image}
                            price={product.price}
                            title={product.name}
                            description={product.description}
                        />
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default HomePage;