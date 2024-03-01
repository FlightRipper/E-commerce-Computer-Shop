import React, { useState, useEffect } from 'react';
import logo from '../../assets/techtrove.png';
import redpc from '../../assets/redpc.jpg';
import './navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const { user } = useAuthContext();
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const username = user ? user.username : "Sign In";
    const image = user ? `http://localhost:5000/uploads/${user.image}` : logo;

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
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

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setIsSearchFocused(true);
    };

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div className='Navbar-main bg-black min-vw-100'>
            <div className='NavBar-MainContainer d-flex align-items-center bg-black'>
                <div className="w-100 d-flex align-items-center mt-3">
                    <img src={logo} alt="logo" className='Navbar-logo'/>
                    <p className='Navbar-heading'>TechTrove</p>
                </div>
                <div className='Navbar-UserNameandImage '>
                    <button className='d-flex align-items-center bg-black Navbar-UserNameandImageButton' onClick={() => (user!="Sign In")? navigate('/profile'):navigate('/')}>
                        <p className='Navbar-UserName mt-3'>{username}</p>
                        <img src={image} alt="logo" className="Navbar-UserImage"></img>
                    </button>
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
                    onBlur={() => setIsSearchFocused(false)}
                />
                
                {isSearchFocused && (
                    <div style={{ position: 'absolute', top: '100%', maxHeight: '25vh', overflow: 'scroll', left: 100, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', zIndex: 1 }}>
                        <div style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}>
                            {filteredProducts.map(product => (
                                <button 
                                    onClick={() => console.log("object")}
                                    key={product.id}
                                    style={{ padding: '8px 16px', gap: '10px', display: 'flex', alignItems: 'center', borderRadius: '7px' }}
                                    onMouseEnter={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'black'; }}
                                >
                                    <Link to={`/single/${product.id}`} style={{ textDecoration: 'none', display: 'contents' }}>
                                        <img className='productImageNavBar' src={`http://localhost:5000/uploads/${product.image}`} />
                                        {product.name}
                                    </Link>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    activeClassName="Navbar-NavbarButtonactive"
                    to="/homepage"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    activeClassName="Navbar-NavbarButtonactive"
                    to="/about"
                >
                    About Us
                </NavLink>
                <NavLink
                   className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                   activeClassName="Navbar-NavbarButtonactive"
                    to="/shop"
                >
                    Shop
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    activeClassName="Navbar-NavbarButtonactive"
                    to="/community"
                >
                    Community
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    activeClassName="Navbar-NavbarButtonactive"
                    to="/contact"
                >
                    Contact Us
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'Navbar-NavbarButtonactive' : 'Navbar-NavbarButton'}
                    activeClassName="Navbar-NavbarButton active"
                    to={"/cart"}
                >
                    Cart
                    <AiOutlineShoppingCart style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;