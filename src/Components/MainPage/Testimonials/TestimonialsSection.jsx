import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <h2>What Users Say</h2>
      <div className="testimonials">
        <div className="testimonial">
          <p>"This platform helped me find the perfect scholarship!"</p>
          <p>- Student Name</p>
        </div>
        <div className="testimonial">
          <p>"Applying for scholarships has never been easier."</p>
          <p>- Another Student</p>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
