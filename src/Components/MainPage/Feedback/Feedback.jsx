import React, { useEffect, useState } from 'react';
import './Feedback.css'; // Custom styles for the card
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Avatar, Skeleton } from '@mui/material';
import axios from 'axios';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };
  const getFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/feedbacks');
      setFeedbacks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeedbacks();
  }, []);


  return (
    <>
<div>
      <hr className='feedback-line' />
      <div className="feedback-container">
        <h2 className='feedback-title'>Users Feedback</h2>
        <Slider {...sliderSettings}>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="feedback-card">
                <div className="feedback-content">
                  <div className="feedback-row">
                    <div className="image-section">
                      <Skeleton variant="circular" width={60} height={60} />
                    </div>
                    <div className="info-section">
                      <Skeleton variant="text" width="70px" />
                      <Skeleton variant="text" width="100px" />
                    </div>
                  </div>
                  <div className="feedback-text">
                    <Skeleton variant="rounded" width="300px" height="100px" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            feedbacks.slice(0, 5).map((item, index) => (
              <div key={index} className="feedback-card">
                <div className="feedback-content">
                  <div className="feedback-row">
                    <div className="image-section">
                      <div className="avatar-container">
                        <Avatar
                          className="active-avatar"
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            width: 60,
                            height: 60,
                            fontSize: 24,
                          }}
                        >
                          {item.user_Account_id.username[0].toUpperCase()}
                        </Avatar>
                      </div>
                    </div>
                    <div className="info-section">
                      <h3>{item.user_Account_id.username}</h3>
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
                      <span className="text">{item.content}</span>
                      <span className="quote under">”</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </Slider>
        <div className="write-container">
          <Link to='/add-feedback' className="write-btn">Add Your Feedback</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Feedback;
