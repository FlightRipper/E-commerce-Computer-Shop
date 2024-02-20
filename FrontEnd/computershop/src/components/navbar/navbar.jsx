import { useState, useEffect } from 'react';
import logo from '../../assets/techtrove.png';
import './navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
    const { user } = useAuthContext();
    const username = user ? user.username : "Sign In";
    const image = user ? `http://localhost:5000/uploads/${user.image}` : logo 

    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    return (
        <div className='Navbar-main bg-black'>
            <div className='NavBar-MainContainer d-flex align-items-center bg-black'>
                <div className="w-100 d-flex align-items-center mt-3">
                    <img src={logo} alt="logo" className='Navbar-logo'/>
                    <p className='Navbar-heading'>TechTrove</p>
                </div>
                <div className='Navbar-UserNameandImage '>
                    <button className='d-flex align-items-center bg-black Navbar-UserNameandImageButton'>
                        <p className='Navbar-UserName'>username</p>
                        <img src={image} alt="logo" className="Navbar-UserImage"></img>
                    </button>
                </div>
            </div>
            <div className="Navbar-NavbarRed d-flex align-items-center mt-3 justify-content-center">
                <p className='Navbar-UserName'>kousa</p>
            </div>
        </div>
    );
}

export default Navbar;
