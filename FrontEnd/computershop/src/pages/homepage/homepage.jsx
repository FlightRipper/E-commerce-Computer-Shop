import { useState, useEffect } from 'react';
import axios from 'axios';
import redpc from '../../assets/redpc.jpg';
import secondpc from '../../assets/pc2.jpg';
import './homepage.css';
import Navbar from '../../components/navbar/navbar';
import FeaturedCard from '../../components/feauturedCard/featuredCard';
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';

const HomePage = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();

    const getFeaturedProducts = async () => {
        const response = await axios.get('http://localhost:5000/products/featured');

        if (response.status ===  200) {
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
                <div className='RedPC'>
                    <Carousel
                        controls={false}
                        indicators={false}
                        interval={2000}
                    >
                        {[redpc, secondpc].map((image, index) => (
                            <Carousel.Item key={index} className='carousel-item'>
                                <img
                                    src={image}
                                    alt={`Slide ${index +  1}`}
                                    className='carousel-image'
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
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
                <Footer/>

            </div>
        </>
    )
}

export default HomePage;
