import React, { useState, useEffect } from "react";
import './viewall.css'
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import FeaturedCard from "../../components/feauturedCard/featuredCard";
import { Link } from "react-router-dom";
const ViewAll = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleSubCategoryChange = (subcategoryId) => {
        setSelectedSubcategory(subcategoryId);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                if (response.status === 200) {
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
                    <div className="viewallproducts">
                        {filteredProducts.map((product) => (
                            <Link to={`/single/${product.id}`}>
                            <button style={{border: 'none', outline: 'none', background: 'none'}}>
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
    );
}

export default ViewAll;