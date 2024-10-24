import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import NewestScholarships from './NewestScholarships/NewestScholarships'
import Footer from '../Shared/Footer/Footer'
import HeroSection from './HeroSection/HeroSection'
import AboutSection from './AboutSection/AboutSection'
import Feedback from './Feedback/Feedback'
import FeaturesSection from './FeaturesSection/FeaturesSection'

function MainPage() {
    return (
        <>
            
            <section className="main-page">
                <Navbar />
                <HeroSection />
                <AboutSection />
                <FeaturesSection />
                <NewestScholarships/>
                <Feedback />
                <Footer />
            </section>
            
        </>
    )
}

export default MainPage