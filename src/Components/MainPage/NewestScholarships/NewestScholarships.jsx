import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewestScholarships.css'; // You'll style it here
import axios from 'axios';
const NewestScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    // Fetch scholarships from the API
    const fetchScholarships = async () => {
        try {
            const response = await axios.get('https://api.example.com/scholarships'); // Replace with your API endpoint
            setScholarships(response.data); // Assuming the API returns an array of scholarships
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        }
    };

    fetchScholarships();
}, []);
  // Example data until the API is ready
  const exampleData = [
    {
      id: 1,
      name: 'Scholarship A',
      deadline: '2024-12-01',
      image: 'https://via.placeholder.com/400',
      description: 'A scholarship for undergraduate students in the field of computer science.',
    },
    {
      id: 2,
      name: 'Scholarship B',
      deadline: '2024-11-15',
      image: 'https://via.placeholder.com/400',
      description: 'A scholarship for high school graduates pursuing engineering degrees.',
    },
    {
      id: 3,
      name: 'Scholarship C',
      deadline: '2024-10-31',
      image: 'https://via.placeholder.com/400',
      description: 'A financial aid opportunity for medical students.',
    },
    {
      id: 4,
      name: 'Scholarship D',
      deadline: '2024-12-20',
      image: 'https://via.placeholder.com/400',
      description: 'A scholarship for students excelling in business studies.',
    },
  ];

  useEffect(() => {
    setScholarships(exampleData);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Display only one scholarship
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };
  const displayedScholarships = scholarships.slice(0, 4);
  return (
    <section className="newest-scholarships">
      <h2 className="section-title">Newest Scholarships</h2>
      <Slider {...settings}>
        {scholarships.map((scholarship) => (
          <div className="scholarship-slide" key={scholarship.id}>
            <div className="scholarship-content">
              <div className="scholarship-info">
                <h3>{scholarship.name}</h3>
                <p className="scholarship-deadline"><strong>Deadline:</strong> {scholarship.deadline}</p>
                <p className="scholarship-description">{scholarship.description}</p>
                <Link to="scholarship-detail" className="apply-btn">View Details</Link>
              </div>
              <div className="scholarship-image-container">
                <img
                  src={scholarship.image}
                  alt={scholarship.name}
                  className="scholarship-image"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="search-container">
        <Link to='/search-scholarships' className="search-btn">Search Scholarships</Link>
      </div>
    </section>
  );
};

export default NewestScholarships;
