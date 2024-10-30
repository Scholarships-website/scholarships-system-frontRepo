import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewestScholarships.css';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton'; // Import the Skeleton component

const NewestScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/scholarships');
        console.log(response.data);
        setScholarships(response.data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
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
        {loading ? ( // Render skeletons if loading
          Array.from(new Array(5)).map((_, index) => (
            <div className="scholarship-slide" key={index}>
              <div className="scholarship-content">
                <div className="scholarship-info" style={{ width: '300px' }}>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="70%" height={24} />
                  <Skeleton variant="text" width="60%" height={24} />
                </div>
                <div className="scholarship-image-container">
                  <Skeleton variant="rectangular" width={300} height={300} /> {/* Image Skeleton */}
                </div>
              </div>
            </div>
          ))
        ) : (
          scholarships.slice(0, 5).map((scholarship) => (
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
                  <Link to={`/scholarship-detail/${scholarship._id}`} className="apply-btn">View Details</Link>
                </div>
                <div className="scholarship-image-container">
                  <img
                    src={scholarship.scholarship_picture}
                    alt={scholarship.scholarship_name}
                    className="scholarship-image"
                    width='400px'
                    height='400px'
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </Slider>
      <div className="search-container">
        <Link to='/search-scholarships' className="search-btn">View More Scholarships</Link>
      </div>
    </section>
  );
};

export default NewestScholarships;
