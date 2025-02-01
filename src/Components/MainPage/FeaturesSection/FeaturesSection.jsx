import React from "react";
import Slider from "react-slick";
import "./FeaturesSection.css";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const features = [
    { title: "Find Scholarships Easily", description: "Search and filter scholarships based on your field, location, GPA, and more." },
    { title: "Simple Application Process", description: "Apply to scholarships with just a few clicks and track your progress." },
    { title: "Save Your Favorites", description: "Bookmark scholarships you're interested in for easy access later." },
    { title: "For Providers", description: "Post scholarship opportunities and review applications effortlessly." },
    { title: "Secure & Reliable", description: "Enjoy a secure platform with user-friendly management tools for students, providers, and admins." },
    { title: "Stay Updated", description: "Receive notifications about application deadlines and status updates." },
    { title: "Feedback & Reviews", description: "Share and read feedback from other students and scholarship providers." }
];

const FeaturesSection = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 520,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <div className="feature-section">
            <div className='bg'></div>
            <div className='bg'></div>
            <div className='bg'></div>
            <div className="feature-title">
                <h2>Our Features</h2>
                <span className="angle-icon">
                    <FontAwesomeIcon icon={faGraduationCap} />
                </span>
            </div>
            <div className="feature-layout">
                <div className="feature-container">
                    <Slider {...settings}>
                        {features.map((feature, index) => (
                            <div key={index} className="feature-item">
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
