import React, { useEffect, useState } from 'react';
import './Feedback.css'; // Custom styles for the card
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample feedback data
  const sampleFeedbacks = [
    {
      name: "John Doe",
      profession: "Software Engineer",
      feedback: "This platform has been incredibly helpful for finding scholarships!",
      rating: 5,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      name: "Jane Smith",
      profession: "Graphic Designer",
      feedback: "The application process is straightforward and easy to navigate.",
      rating: 4,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      name: "Alice Johnson",
      profession: "Web Developer",
      feedback: "I love how I can manage my profile and bookmark my favorite scholarships.",
      rating: 5,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      name: "Bob Brown",
      profession: "Data Scientist",
      feedback: "A fantastic resource for students looking for funding opportunities.",
      rating: 4,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      name: "Charlie Green",
      profession: "Marketing Specialist",
      feedback: "Highly recommend this service to any student!",
      rating: 5,
      imageUrl: "https://via.placeholder.com/150"
    }
  ];

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500, // Speed of the transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  // Fetch feedback data from API
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        // Uncomment the following lines to use the actual API
        // const response = await fetch('https://api.example.com/feedbacks'); 
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.json();
        // setFeedbacks(data);

        // Simulating data fetch by using sample data
        setFeedbacks(sampleFeedbacks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  if (error) {
    return <div>Error fetching feedback: {error}</div>;
  }

  return (
    <>
    <hr className='feedback-line' />
      <div className="feedback-container">
        <h2 className='feedback-title'>Users Feedback</h2>
        <Slider {...sliderSettings}>
          {feedbacks.map((item, index) => (
            <div key={index} className="feedback-card">
              <div className="feedback-content">
                <div className="feedback-row">
                  <div className="image-section">
                    <img src={item.imageUrl} alt={`${item.name}`} className="profile-img" />
                  </div>
                  <div className="info-section">
                    <h3>{item.name}</h3>
                    <p className="profession">{item.profession}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, starIndex) => (
                        <span key={starIndex} className={starIndex < item.rating ? "star filled" : "star"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="feedback-text">
                  <p className="speech-bubble">
                    <span className="quote">“</span>
                    <span className="text">{item.feedback}</span>
                    <span className="quote under">”</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="write-container">
          <Link to='/add-feedback' className="write-btn">Add Feedback</Link>
        </div>
      </div>
    </>

  );
};

export default Feedback;
