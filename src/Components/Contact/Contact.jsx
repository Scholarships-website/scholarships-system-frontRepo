import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './Contact.css';
import Navbar from '../Shared/Navbar/Navbar'

function Contact() {
    const sendLetterRef = useRef(null);
    const [formData, setFormData] = useState({
        message: '',
        name: '',
        email: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.example.com/send-message', formData);
            if (response.status === 200) {
                setIsSubmitted(true);
                document.body.classList.add("sent");
            } else {
                console.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const sendLetter = sendLetterRef.current;
        sendLetter.addEventListener("click", handleSubmit);

        return () => {
            sendLetter.removeEventListener("click", handleSubmit);
        };
    }, [formData]);

    return (
        <>
        <Navbar />
            <div className="contact-container">
                <div className="wrapper centered">
                    <article className="letter">
                        <div className="side">
                            <h1>Contact us</h1>
                            <p>
                                <textarea
                                    name="message"
                                    placeholder="Your message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </p>
                        </div>
                        <div className="side">
                            <p>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </p>
                            <p>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </p>
                            <p>
                                <button id="sendLetter" ref={sendLetterRef}>Send</button>
                            </p>
                        </div>
                    </article>
                    <div className="envelope front"></div>
                    <div className="envelope back"></div>
                </div>
                {isSubmitted && <p className="result-message centered">Thank you for your message</p>}
            </div>
        </>
    );
}

export default Contact;
