import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Welcome to PalScholarships</h1>
                <p className='welcome'>Your gateway to countless scholarship opportunities!</p>
                <p>Whether you’re a high school graduate, an undergraduate, or seeking advanced studies, we are here to help you find scholarships that match your dreams and qualifications. With a user-friendly interface and powerful search tools, explore the scholarships that will bring you closer to your academic goals.</p>
                <Link to='/search-scholarships' className="cta-button">Search Scholarships Now</Link>
                <div className="iconContainer  -ml-8 lg:-ml-12 -mb-6">
                    <div className="iconRow pl-8 lg:pl-12 pb-6  md:items-start space-x-3 md:space-x-4">
                        <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full ">
                            <img src="src/assets/img/true.gif" alt="true" width='30px' />
                        </div>
                        <div className="text-center md:text-left">
                            <div className=""> Advanced Scholarship Search</div>
                        </div>
                    </div>
                    <div className="iconRow pl-8 lg:pl-12 pb-6  md:items-start space-x-3 md:space-x-4">
                        <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full ">
                            <img src="src/assets/img/true.gif" alt="true" width='30px' />
                        </div>
                        <div className="text-center md:text-left">
                            <div className="">Personalized Matching</div>
                        </div>
                    </div>
                    <div className="iconRow pl-8 lg:pl-12 pb-6  md:items-start space-x-3 md:space-x-4">
                        <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full ">
                            <img src="src/assets/img/true.gif" alt="true" width='30px' />
                        </div><div className="text-center md:text-left">
                            <div className="">Real-Time Updates</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
