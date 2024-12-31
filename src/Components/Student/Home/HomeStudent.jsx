import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../Context/UserContext'
import Loading from '../../Shared/Loading/Loading';
import { Skeleton } from '@mui/material';
import "./HomeStudent.css"; // Add a separate CSS file for better organization
import { Link } from 'react-router-dom';

function HomeStudent() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/scholarships");
        if (!response.ok) {
          throw new Error("Failed to fetch scholarships");
        }
        const data = await response.json();
        setScholarships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const soonDeadlines = scholarships.filter((scholarship) => {
    const now = new Date();
    const deadline = new Date(scholarship.End_Date);
    const diffInDays = (deadline - now) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return diffInDays > 0 && diffInDays <= 100; // Deadlines within the next 30 days
  });

  if (error) return <p>Error: {error}</p>;
  if (!userData) {
    return <Loading />;
  }
  return (
    <>
      <h2 className="d-flex align-items-center">
        Welcome <span style={{ textTransform: "uppercase", whiteSpace: "pre-wrap" }}> {userData.username}</span>
        <img src="src/assets/img/hi.gif" alt="example-gif" width="40px" />
        !
      </h2>
      <div className="image-container">
        {loading ? (
          <Skeleton variant="rectangular" width={500} height={500} />
        ) : (
          <iframe
            src="https://lottie.host/embed/3273877b-6bca-4fe8-9417-c922808af93e/34aOWzVHl5.json"
            width="700px"
            height="700px"
            loading="lazy"
            title="Lottie Animation" 
          />
        )}
      </div>
      {soonDeadlines.length > 0 && (
        <div className="calendar-container">
          <h1>Scholarships with Upcoming Deadlines</h1>
          <div className="calendar-grid">
            {soonDeadlines.map((scholarship) => (
              <div className="calendar-card" key={scholarship._id}>
                <div className="card-header">
                  <img
                    src={scholarship.scholarship_picture}
                    alt={scholarship.scholarsip_name}
                    className="card-image"
                    loading="lazy"
                  />
                </div>
                <div className="card-body">
                  <h2>{scholarship.scholarsip_name}</h2>
                  <p>{scholarship.brief_descrition}</p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(scholarship.End_Date).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/scholarship-detail/${scholarship._id}`}
                    className="card-link"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default HomeStudent