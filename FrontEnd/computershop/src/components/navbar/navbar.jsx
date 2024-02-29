import React, { useState, useEffect } from 'react';
import logo from '../../assets/techtrove.png';
import redpc from '../../assets/redpc.jpg';
import './navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

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
                <div style={{ position: 'absolute', top: '100%', maxHeight: '25vh', overflow: 'scroll', left: 100, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}>
                        {filteredProducts.map(product => (
                            <Link href={`/single/${product.id}`} key={product.id}>
                                <button onClick={() => console.log("first")}>
                                    <li
                                        style={{ padding: '8px 16px', gap: '10px', display: 'flex', alignItems: 'center', borderRadius: '7px' }}
                                        onMouseEnter={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }}
                                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'black'; }}
                                    >
                                        <img className='productImageNavBar' src={`http://localhost:5000/uploads/${product.image}`} />
                                        {product.name}
                                    </li>
                                </button>
                            </Link>
                        ))}
                    </ul>
                </div>
                )}
                <button className='Navbar-NavbarButton' onClick={() => navigate('/homepage')}>Home</button>
                <button className='Navbar-NavbarButton' onClick={() => navigate('/about')}>About Us</button>
                <button className='Navbar-NavbarButton' onClick={() => navigate('/shop')}>Shop</button>
                <button className='Navbar-NavbarButton' onClick={() => navigate('/community')}>Community</button>
                <button className='Navbar-NavbarButton' onClick={() => navigate('/contact')}>Contact Us</button>
                <button className='Navbar-NavbarButton' onClick={() => (user !== "Sign In") ? navigate('/cart') : navigate('/')}>
                    <span>Cart</span>
                    <AiOutlineShoppingCart style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
                </button>
            </div>
        </div>
    );
}

export default Navbar;