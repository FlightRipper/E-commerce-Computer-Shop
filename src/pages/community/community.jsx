import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import axios from "axios";
import './community.css';
import PostCard from "../../components/postsCard/postsCard";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Loader from "../../components/loader/loader";
import AOS from "aos";
import "aos/dist/aos.css";

const Community = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        AOS.init({ duration: 1000 });
    })
    const handleSubmit = async (event) => {
        console.log(image);
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('UserId', user.id);
        try {
            await axios.post("http://localhost:5000/posts/add", formData);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5000/posts/")
            .then((response) => {
                setLoading(false);
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            {(loading) ? <Loader/> :
            <>
                <Navbar/>
                <div className="communitymain bg-black min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="communitycontainer d-flex flex-column justify-content-around align-items-center">
                        <div className="community-fo2 d-flex align-items-center justify-content-center flex-column">
                            <p className="communitytitle" data-aos="fade-left">Community</p>                            
                            <button className="codepen-button" style={{marginLeft: "10px"}} data-aos="fade-down">
                                <span className="text" onClick={() => {setShow(!show); if (!user) navigate('/')}}>Create Post</span>
                            </button>
                        </div>
                        <div className="communitycards" data-aos="fade-right">
                            {posts.map((post) => (
                                <PostCard key={post.id}
                                    image={post.image}
                                    description={post.description}
                                    username={post.User.username}
                                    userImage={post.User.image}
                                />))}
                        </div>
                    </div>
                    <Footer/>
                </div>

                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton onClick={()=>{setCategoryButtonName("Category")}}>
                        <Modal.Title>Create Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form >
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Enter description"
                            required = {true}
                            onChange={(event) => setDescription(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                        <Form.Label>Images</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Enter image"
                                required= {true}
                                multiple={false}
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                        </Form.Group>
                        <Button variant=" mt-3" className="SubmitButton bg-warning" type="submit" onClick={handleSubmit} >
                            Submit
                        </Button>
                    </Form>
                    </Modal.Body>
                </Modal>
            </>
        }
    </>
    )
}

export default Community