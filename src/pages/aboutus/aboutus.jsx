import React, {useState, useEffect} from 'react';
import "./aboutus.css";
import Footer from '../../components/footer/footer';
import logo from '../../assets/techtroveaboutus.png';
import Navbar from '../../components/navbar/navbar';
import AOS from "aos";
import "aos/dist/aos.css";
const AboutUs = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <><Navbar/>
            <div className='AboutUs-Container bg-black min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center'>
                    <div className='aboutUs-info d-flex'>
                        <img src={logo} alt="logo" className='AboutUs-logo' data-aos="fade-up"/>
                        <div className='AboutUs-Info d-flex flex-column'>
                            <p className='AboutUs-heading-AboutUs' data-aos="fade-left">About Us</p>
                            <p className='AboutUs-heading' data-aos="fade-right">Our Mission </p>
                            <p className='AboutUs-Description' data-aos="fade-left">We are a team of passionate individuals who are passionate about technology.</p>
                            <p className='AboutUs-heading' data-aos="fade-right" >Our Services </p>
                            <p className='AboutUs-Description' data-aos="fade-left"> We offer a wide range of services including web development, app development, and digital marketing. </p>
                            <p className='AboutUs-heading' data-aos="fade-right">Our Prices </p>
                            <p className='AboutUs-Description' data-aos="fade-left"> We offer competitive prices for our services. </p>
                            <h2 className='AboutUs-heading' data-aos="fade-right">Contact Us</h2>
                            <p className='AboutUs-Description' data-aos="fade-left">
                                For more information or to get in touch, please email us at <a href="mailto:info@techtrove.com">info@techtrove.com</a> or call us at (123)  456-7890.
                            </p>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )
}

export default AboutUs