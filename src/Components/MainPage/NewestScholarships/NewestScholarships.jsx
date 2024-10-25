import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewestScholarships.css';
import axios from 'axios';

const NewestScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    // Fetch scholarships from the API
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/scholarships');
        console.log(response.data);
        setScholarships(response.data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
    <section className="newest-scholarships">
      <h2 className="section-title">Newest Scholarships</h2>
      <Slider {...settings}>
        {/* slice to view just 5 items */}
        {scholarships.slice(0, 5).map((scholarship) => (
          <div className="scholarship-slide" key={scholarship._id}>
            <div className="scholarship-content">
              <div className="scholarship-info">
                <h3>{scholarship.scholarsip_name}</h3>
                <p className="scholarship-deadline">
                  <strong>Deadline:</strong>{' '}
                  {new Date(scholarship.End_Date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </p>
                <p className="scholarship-description">{scholarship.brief_descrition}</p>
                <Link to="scholarship-detail" className="apply-btn">View Details</Link>
              </div>
              <div className="scholarship-image-container">
                <img
                  src='https://via.placeholder.com/400'
                  alt={scholarship.scholarship_name}
                  className="scholarship-image"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="search-container">
        <Link to='/search-scholarships' className="search-btn">View More Scholarships</Link>
      </div>
    </section>
  );
};

export default NewestScholarships;
