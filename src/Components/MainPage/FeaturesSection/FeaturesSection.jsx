import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
    return (
        <section className="features-section" id="features">
            <h2>Features</h2>
            <div className="features">
                <div className="feature">
                    <h3>Search Scholarships</h3>
                    <p>Access thousands of scholarships in one place.</p>
                </div>
                <div className="feature">
                    <h3>Easy Application</h3>
                    <p>Apply for scholarships with just a few clicks.</p>
                </div>
                <div className="feature">
                    <h3>Global Reach</h3>
                    <p>Find scholarships from universities and institutions worldwide.</p>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
