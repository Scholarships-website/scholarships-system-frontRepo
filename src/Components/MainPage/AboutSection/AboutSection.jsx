import React, { useEffect } from 'react';
import './AboutSection.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <section className="about-section" id="about">
      <h2>About Us</h2>
      <div className="about-row">
        <div
          className="about-item icon-text-card relative space-y-4 lg:space-y-8 lg:px-6 flex flex-col flex-auto bg-lightTaupe rounded-2xl !py-[50px] !px-[16px]"
          data-aos="fade-up"
        >
          <img src="src/assets/img/graduation-hat.png" alt="graduation-hat" width="70px" />
          <h3>Our Mission</h3>
          <p>
            We aim to make education more accessible by connecting students with scholarships that
            fit their academic and financial needs. Our goal is to ease the path to higher education
            for students everywhere.
          </p>
        </div>
        <div
          className="about-item icon-text-card relative space-y-4 lg:space-y-8 lg:px-6 flex flex-col flex-auto bg-lightTaupe rounded-2xl !py-[50px] !px-[16px]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img src="src/assets/img/university.png" alt="university" width="70px" />
          <h3>What We Offer</h3>
          <p>
            We provide a comprehensive platform with a wide range of scholarships, powerful search
            tools, and personalized matching to help students find and apply for the right
            opportunities quickly and efficiently.
          </p>
        </div>
        <div
          className="about-item icon-text-card relative space-y-4 lg:space-y-8 lg:px-6 flex flex-col flex-auto bg-lightTaupe rounded-2xl !py-[50px] !px-[16px]"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <img src="src/assets/img/global-learning.png" alt="global-learning" width="70px" />
          <h3>Why Choose Us</h3>
          <p>
            With regularly updated scholarships from trusted institutions, we ensure students have
            access to the latest opportunities. Our user-friendly platform makes the search process
            simple, saving time and effort.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
