import React, { useEffect, useState } from 'react';
import './NewestScholarships.css';

const NewestScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    // Fetch scholarships from an API or a backend service
    fetch('/api/scholarships') // Replace with your actual API
      .then((res) => res.json())
      .then((data) => setScholarships(data));
  }, []);

  return (
    <section className="new-scholarships">
      <h2>Newest Scholarships</h2>
      <div className="scholarship-cards">
        {scholarships.map((scholarship) => (
          <div className="scholarship-card" key={scholarship.id}>
            <h3>{scholarship.title}</h3>
            <p>{scholarship.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewestScholarships;
