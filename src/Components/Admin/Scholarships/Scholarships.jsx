import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Box, Skeleton } from '@mui/material';
import AcceptedScholarship from './AcceptedScholarship';
import PendingScholarship from './PendingScholarship';
import RejectedScholarship from './RejectedScholarship';
import { PieChart } from '@mui/x-charts';
import axios from 'axios';


export default function Scholarships() {
  const [value, setValue] = useState(0); // Track the selected tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchScholarships();
  }, []);
  const [scholarships, setScholarships] = useState([]);
  const [pendingScholarships, setPendingScholarships] = useState([]);
  const [rejectedScholarships, setRejectedScholarships] = useState([]);
  const [loadingC, setLoadingC] = useState(true);


  const fetchScholarships = async () => {
    setLoadingC(true);
    try {
      const [acceptedRes, pendingRes, rejectedRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/v1/scholarships`),
        axios.get(`http://localhost:3000/api/v1/admin/scholarhips/pending`),
        axios.get(`http://localhost:3000/api/v1/admin/scholarhips/reject`),
      ]);
      const acceptedScholarships = acceptedRes.data;
      const pendingScholarships = pendingRes.data;
      const rejectedScholarships = rejectedRes.data;
      setScholarships(acceptedScholarships);
      setPendingScholarships(pendingScholarships);
      setRejectedScholarships(rejectedScholarships);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoadingC(false);
    }
  };

  return (
    <div>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Scholarship status tabs">
                    <Tab label="Accepted" />
                    <Tab label="Pending" />
                    <Tab label="Rejected" />
                </Tabs>
            </Box>
            <Box sx={{ mt: 3 }}>
                {value === 0 && <AcceptedScholarship />}
                {value === 1 && <PendingScholarship />} 
                {value === 2 && <RejectedScholarship />}
            </Box>
                  <div className="pieChartContainer">
        {loadingC ? (
          <Skeleton
            variant="circular"
            width={window.innerWidth <= 850 ? 300 : 400}
            height={window.innerWidth <= 850 ? 300 : 400}
          />
        ) : (
          <PieChart
            series={[
              {
                data: window.innerWidth <= 850
                  ? [
                    { id: 0, value: scholarships.length, color: '#4caf50', label: 'Accepted' },
                    { id: 1, value: pendingScholarships.length, color: '#ff9800', label: 'Pending' },
                    { id: 2, value: rejectedScholarships.length, color: '#f44336', label: 'Rejected' },
                  ]
                  : [
                    { id: 0, value: scholarships.length, label: 'Accepted Scholarships', color: '#4caf50' },
                    { id: 1, value: pendingScholarships.length, label: 'Pending Scholarships', color: '#ff9800' },
                    { id: 2, value: rejectedScholarships.length, label: 'Rejected Scholarships', color: '#f44336' },
                  ],
              },
            ]}
            width={window.innerWidth <= 850 ? 400 : 800}
            height={window.innerWidth <= 850 ? 200 : 400}
            className="customPieChart"
          />
        )}
      </div> 
        </div>
  );
}

