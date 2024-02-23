import React from 'react';
import "./aboutus.css";
import Footer from '../../components/footer/footer';
import logo from '../../assets/techtrove.png';
import Navbar from '../../components/navbar/navbar';
const AboutUs = () => {
    return (
        <><Navbar/>
            <div className='AboutUs-Container bg-black min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center'>
                    <div className='aboutUs-info d-flex'>
                        <img src={logo} alt="logo" className='AboutUs-logo vw-25 vh-25 align-content-center'/>
                        <div className='AboutUs-Info d-flex flex-column'>
                            <p className='AboutUs-heading'>Our Mission </p>
                            <p className='AboutUs-Description'>We are a team of passionate individuals who are passionate about technology.</p>
                            <p className='AboutUs-heading'>Our Services </p>
                            <p className='AboutUs-Description'> We offer a wide range of services including web development, app development, and digital marketing. </p>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )
}

export default AboutUs