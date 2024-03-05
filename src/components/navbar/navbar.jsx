import React, { useState, useEffect, useRef  } from 'react';
import logo from '../../assets/techtrove.png';
import redpc from '../../assets/redpc.jpg';
import './navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { NavLink , useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const { user } = useAuthContext();
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const username = user ? user.username : "Sign In";
    const image = user ? `https://e-commerce-computer-shop-backend.onrender.com/uploads/${user.image}` : logo;

    const getProducts = async () => {
        const response = await axios.get('https://e-commerce-computer-shop-backend.onrender.com/products');
        if (response.status === 200) {
            setProducts(response.data);
        }
        console.log(response.data);
    };


    useEffect(() => {
        if (user) {
            console.log(user);
        }
        getProducts();
    }, [user]);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setIsSearchFocused(true);
    };

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <>
        <div className='Navbar-main bg-black min-vw-100'>
            <div className='NavBar-MainContainer d-flex align-items-center bg-black'>
                <div className="w-100 d-flex align-items-center mt-3">
                    <button className='Navbar-LogoButton bg-black' onClick={() => navigate('/homepage')}>
                        <img src={logo} alt="logo" className='Navbar-logo'/>
                    </button>
                    <p className='Navbar-heading'>TechTrove</p>
                </div>
                <div className='Navbar-UserNameandImage '>
                    {username == "Sign In" ? (
                        <button className='d-flex align-items-center bg-black Navbar-UserNameandImageButton' onClick={() => navigate('/')}>
                            <p className='Navbar-UserName mt-3'>{username}</p>
                            <img src={image} alt="logo" className="Navbar-UserImage"></img>
                        </button>
                    ) : (
                        <div className='d-flex align-items-center bg-black Navbar-UserNameandImageButton'> <p className='Navbar-UserName mt-3'>{username}</p>
                        <img src={image} alt="logo" className="Navbar-UserImage"></img> </div>
                    )}
                </div>
            </div>
            <div className="Navbar-NavbarRed d-flex mt-3 justify-content-center">
                <input
                    className='Navbar-Search'
                    type="text"
                    placeholder="Search 🔍"
                    value={searchValue}
                    onChange={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}
                />
                {isSearchFocused && (
                    <div ref={searchRef} style={{ position: 'absolute', top: '100%', maxHeight: '25vh', overflow: 'scroll', left: 220, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', zIndex: 1 }}>
                        {filteredProducts.map(product => (
                            <button
                                onClick={() => {window.location.href = `/single/${product.id}`}}
                                key={product.id}
                                style={{ padding: '8px 16px', gap: '10px', display: 'flex', alignItems: 'center', borderRadius: '7px' }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'black'; }}
                            >
                                <img className='productImageNavBar' src={`https://e-commerce-computer-shop-backend.onrender.com/uploads/${product.image}`} />
                                {product.name}
                            </button>
                        ))}
                    </div>
                )}

                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    to="/homepage"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    to="/about"
                >
                    About Us
                </NavLink>
                <NavLink
                   className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    to="/shop"
                >
                    Shop
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    to="/community"
                >
                    Community
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    // activeClassName="Navbar-NavbarButtonactive"
                    to="/contact"
                >
                    Contact Us
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    to={"/cart"}
                >
                    Cart
                    <AiOutlineShoppingCart style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
                </NavLink>
            </div>
        </div>
        </>
    );
}

export default Navbar;