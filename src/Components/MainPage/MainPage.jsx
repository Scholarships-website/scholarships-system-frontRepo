import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import NewestScholarships from './NewestScholarships/NewestScholarships'
import Footer from '../Shared/Footer/Footer'
import HeroSection from './HeroSection/HeroSection'
import AboutSection from './AboutSection/AboutSection'
import TestimonialsSection from './Testimonials/TestimonialsSection'
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
                {/* <TestimonialsSection /> */}
                <Footer />
            </section>
            
        </>
    )
}

export default MainPage