import React, { useState, useEffect } from "react";
import './viewall.css'
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import FeaturedCard from "../../components/feauturedCard/featuredCard";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/loader";
import Swal from 'sweetalert2';
const ViewAll = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

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
                text: question,
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
                setLoading(true);
                const response = await axios.get('http://localhost:5000/categories');
                if (response.status === 200) {
                    setLoading(false);
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchSubCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/subcategories/');
                if (response.status === 200) {
                    setLoading(false);
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
                    <p className="viewallproductstitle">Shop</p>
                    <div className="select-container">
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
                    <form className="Contactusinput-group d-flex gap-5" onSubmit={handleask}>
                        <input required type="text" className="inputCOntactus" onChange={(e) => setQuestion(e.target.value)}/>
                        <label className="Contactususer-label">Ask a question</label>
                        <button type="submit" className="codepen-button"><span>Submit</span></button>
                    </form>
                    <div className="viewallproducts">
                        {filteredProducts.map((product) => (
                            <Link to={`/single/${product.id}`} className="viewallproductbuttonproduct">
                            <button style={{border: 'none', outline: 'none', background: 'none'}} >
                                <FeaturedCard
                                    image={product.image}
                                    price={product.price}
                                    title={product.name}
                                    description={product.description}
                                />
                            </button>
                        </Link>
                        ))}
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