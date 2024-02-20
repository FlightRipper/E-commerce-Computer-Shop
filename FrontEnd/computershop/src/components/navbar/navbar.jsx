import {useState, useEffect} from 'react';
import logo from '../../assets/techtrove.png';
import './navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import jwt_decode from 'jwt-decode';
const Navbar = () => {
    const { user } = useAuthContext();
    console.log(user)
    const username = user.username
    return (
        <div className='Navbar-main d-flex align-items-center bg-black'> 
            <div className="w-100 d-flex align-items-center mt-3">
                <img src={logo} alt="logo" className='Navbar-logo'/>
                <h1 className='Navbar-heading'>TechTrove</h1>
                <h1 className='Navbar-UserName'>.com</h1>
            </div>
        
        </div>
    )
}

export default Navbar