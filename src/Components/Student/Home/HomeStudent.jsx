import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import Loading from '../../Shared/Loading/Loading';
import { Skeleton } from '@mui/material';
import './HomeStudent.css'; // Your own CSS file
import { Link } from 'react-router-dom';
import ScholarshipCalendar from './ScholarshipCalendar';

function HomeStudent() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // Dynamic CSS loading for ScholarshipCalendar only
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/rsuite/dist/rsuite.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <>
      <div className="homeStudent">
        <h2 className="d-flex align-items-center studentHeader">
          Welcome&nbsp;
          <span style={{ textTransform: 'uppercase' }}>{userData.username}</span>
          &nbsp;<img src="src/assets/img/hi.gif" alt="example-gif" width="40px" />!
        </h2>
        <div className="image-container">
          {loading ? (
            <Skeleton variant="rectangular" width={500} height={500} />
          ) : (
            <iframe
              className="responsive-iframe"
              src="https://lottie.host/embed/3273877b-6bca-4fe8-9417-c922808af93e/34aOWzVHl5.json"
              width="700px"
              height="700px"
              loading="lazy"
              title="Lottie Animation"
            />
          )}
        </div>
      </div>

      {/* Wrap ScholarshipCalendar in a div to scope its styles */}
      <div className="scholarship-calendar-container">
        <ScholarshipCalendar />
      </div>
    </>
  );
}

export default HomeStudent;
