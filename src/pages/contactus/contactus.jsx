import React, {useState, useEffect} from 'react';
import './contactus.css'
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import logo from '../../assets/techtroveaboutus.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const onSubmit = async (e) => {
        e.preventDefault();
        const responce = await axios.post("http://localhost:5000/contactus/add", {message, name, email});
        if (responce.status === 200) {
            Swal.fire({
                title: "Success",
                text: "Message sent successfully",
                icon: "success"
            });
        }
        setMessage("")
        setName("")
        setEmail("")
    }

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <><Navbar/>
        <div className="ContactUsMain bg-black min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
            <div className="ContactUs-info d-flex">
                <img src={logo} alt="logo" className='AboutUs-logo' data-aos="fade-up"/>
                <form className='contactus-info d-flex flex-column' onSubmit={onSubmit}>
                    <p className='AboutUs-heading' data-aos="fade-left">Contact Us</p>
                    <div className="Contactusinput-group" data-aos="fade-down">
                        <input
                        required={true}
                        type="text"
                        name="name"
                        autoComplete="off"
                        className="inputCOntactus"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <label className="Contactususer-label">Name</label>
                    </div>
                    <div className="Contactusinput-group" data-aos="fade-up">
                        <input
                        required={true}
                        type="text"
                        name="email"
                        autoComplete="off"
                        className="inputCOntactus"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="Contactususer-label">Email</label>
                    </div>
                    <div className="Contactusinput-group" data-aos="fade-down">
                        <textarea
                        required={true}
                        type="text"
                        name="message"
                        autoComplete="off"
                        className="inputCOntactus"
                        style={{
                            resize: "none",
                            padding: "10px",
                            boxSizing: "border-box",
                            height: "16vh"
                        }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <label className="Contactususer-label">Message</label>
                    </div>
                    <button type="submit" className="codepen-button" ><span>Submit</span></button>
                </form>
            </div>
            <Footer/>
        </div>
        </>
    )
}

export default ContactUs