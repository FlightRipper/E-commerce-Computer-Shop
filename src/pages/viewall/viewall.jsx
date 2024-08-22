import React, { useState, useEffect, useRef } from "react";
import './viewall.css'
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import FeaturedCard from "../../components/feauturedCard/featuredCard";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/loader";
import Swal from 'sweetalert2';
import AOS from "aos";
import "aos/dist/aos.css";
const ViewAll = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);


    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

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

    async function handleask() {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTBlOGQ5YWUtMmExNC00YTA1LTgzZWMtMWY0ZThhMDczMDIwIiwidHlwZSI6ImFwaV90b2tlbiJ9.DoMaXPi7Sd7I-LpzwNQ4bd7Sd7r_4rtT1aGziC03uSs'
            },
            body: JSON.stringify({
                response_as_dict: true,
                attributes_as_list: false,
                show_original_response: false,
                temperature: 0,
                max_tokens: 1000,
                providers: 'google',
                text: question + "don't say the prices just give me the name of the products",
                chatbot_global_action: 'You are a helpful assistant'
            })
        };
    
        try {
            setLoading(true);
            const response = await fetch('https://api.edenai.run/v2/text/chat', options);
            const data = await response.json();
            setLoading(false);
            console.log(data.google.generated_text);
            const result = await Swal.fire({
                title: "Question",
                text: data.google.generated_text,
                icon: "question",
              });
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubCategoryChange = (subcategoryId) => {
        setSelectedSubcategory(subcategoryId);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/products');
                if (response.status === 200) {
                    setLoading(false);
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                if (response.status === 200) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchSubCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/subcategories/');
                if (response.status === 200) {
                    setSubCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        fetchProducts();
        fetchCategories();
        fetchSubCategories();
    }, []);

    const filteredProduct = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setIsSearchFocused(true);

    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const filteredProducts = products.filter(product => {
        if (selectedCategory && selectedSubcategory) {
            return product.categoryId == selectedCategory && product.subcategoryId == selectedSubcategory;
        } else if (selectedCategory) {
            return product.categoryId == selectedCategory;
        } else if (selectedSubcategory) {
            return product.subcategoryId == selectedSubcategory;
        }
        return true;        
    }); console.log("Filtered Products:", filteredProducts);

    return (
        <>
        {loading ? (<Loader />) : (
            <>
            <Navbar/>
            <div className="bg-black w-100 min-vh-100 d-flex flex-column justify-content-center align-content-center">
                <div className="viewallproductsmain d-flex flex-column align-items-center justify-content-center">
                    <p className="viewallproductstitle" data-aos="fade-left">Shop</p>
                    <form className="Contactusinput-group d-flex gap-5" style={{marginBottom: "40px"}} onSubmit={handleask} data-aos="fade-left">
                        <input required type="text" className="inputCOntactus" onChange={handleSearch} value={searchValue} onFocus={() => setIsSearchFocused(true)}/>
                        <label className="Contactususer-label">Search 🔍</label>
                    </form>
                    
                    <div className="select-container" data-aos="fade-right">
                        <select onChange={(e) => handleCategoryChange(e.target.value)}>
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <select onChange={(e) => handleSubCategoryChange(e.target.value)}>
                          <option value="">Select a subcategory</option>
                          {subCategories.map((subCategory) => (
                            <option key={subCategory.id} value={subCategory.id}>
                              {subCategory.name}
                            </option>
                          ))}
                        </select>
                    </div>
                    <p className="viewallproductstitle">AI assistant</p>
                    <form className="Contactusinput-group d-flex gap-5" onSubmit={handleask} data-aos="fade-left">
                        <input required type="text" className="inputCOntactus" onChange={(e) => setQuestion(e.target.value)}/>
                        <label className="Contactususer-label">Ask a question</label>
                        <button type="submit" className="codepen-button"><span>Submit</span></button>
                    </form>
                    <div className="viewallproducts" data-aos="fade-right">
                        {isSearchFocused  ? (
                            filteredProduct.map((product) => (
                                <Link to={`/single/${product.id}`} className="viewallproductbuttonproduct" key={product.id} ref={searchRef}>
                                    <button style={{border: 'none', outline: 'none', background: 'none'}}>
                                        <FeaturedCard
                                            image={product.image}
                                            price={product.price}
                                            title={product.name}
                                            description={product.description}
                                        />
                                    </button>
                                </Link>
                            ))
                        ) : (
                            filteredProducts.map((product) => (
                                <Link to={`/single/${product.id}`} className="viewallproductbuttonproduct" key={product.id}>
                                    <button style={{border: 'none', outline: 'none', background: 'none'}}>
                                        <FeaturedCard
                                            image={product.image}
                                            price={product.price}
                                            title={product.name}
                                            description={product.description}
                                        />
                                    </button>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
                <Footer/>
            </div>
        </>
        )}
        </>
    );
}

export default ViewAll;