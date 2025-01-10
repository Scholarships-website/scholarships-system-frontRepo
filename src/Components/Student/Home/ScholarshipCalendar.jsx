import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, List, Badge, Row, Col } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css'; // No need to import globally

function ScholarshipCalendar() {
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Dynamically adding the CSS link for this page only
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/rsuite/dist/rsuite.min.css';
    document.head.appendChild(link);

    // Optional: Add a class to the body to scope styles only to this page
    document.body.classList.add('scholarship-calendar-page');

    return () => {
      // Clean up: remove the CSS link and class when component unmounts
      document.head.removeChild(link);
      document.body.classList.remove('scholarship-calendar-page');
    };
  }, []); // Empty array ensures this runs only once on mount and unmount

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships`);
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

  // Filter scholarships with deadlines on the selected date
  const filteredScholarships = selectedDate
    ? scholarships.filter((scholarship) => {
        const deadline = new Date(scholarship.deadline).toDateString();
        return deadline === selectedDate.toDateString();
      })
    : [];

  // Render a badge on dates that have scholarships with deadlines
  const renderCell = (date) => {
    const hasScholarship = scholarships.some(
      (scholarship) => new Date(scholarship.deadline).toDateString() === date.toDateString()
    );
    return hasScholarship ? <Badge className="calendar-todo-item-badge" /> : null;
  };

  return (
    <div style={{ padding: '20px' }} className='calender'>
      <h2 className='studentHeader'>Scholarship Deadlines Calendar</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Calendar
              compact
              renderCell={renderCell}
              onSelect={setSelectedDate}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={16}>
            <List bordered style={{ flex: 1 }}>
              {filteredScholarships.length > 0 ? (
                filteredScholarships.map((scholarship) => (
                  <List.Item key={scholarship._id}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='card-body'>
                      <img
                        src={scholarship.scholarship_picture}
                        alt={scholarship.scholarsip_name}
                        className="card-image"
                        loading="lazy"
                        style={{ width: '250px', borderRadius: '12px' }}
                      />
                      <div><strong>{scholarship.scholarsip_name}</strong></div>
                      <p>{scholarship.brief_descrition}</p>
                      <Link
                        to={`/scholarship-detail/${scholarship._id}`}
                        className="card-link"
                      >
                        View Details
                      </Link>
                      <div>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</div>
                    </div>
                  </List.Item>
                ))
              ) : (
                <div style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                  No scholarships on this date.
                </div>
              )}
            </List>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ScholarshipCalendar;
