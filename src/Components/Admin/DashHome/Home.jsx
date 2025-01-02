import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { PieChart } from '@mui/x-charts';

export default function Home() {
  const { userToken, setUserToken, userData } = useContext(UserContext);
  const [data, setData] = useState({
    studentsCount: 0,
    advertisersCount: 0,
    scholarshipsCount: 0,
  });
  const [studentsCount, setStudentsCount] = useState(0);
  const [advertisersCount, setAdvertisersCount] = useState(0);
  const [scholarshipsCount, setScholarshipsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const incrementCounter = (targetCount, setCounter) => {
    let currentCount = 0;
    const interval = setInterval(() => {
      if (currentCount < targetCount) {
        currentCount += Math.ceil(targetCount / 100); // Gradually increase
        setCounter(currentCount);
      } else {
        clearInterval(interval); // Stop once target is reached
      }
    }, 50); // Adjust time interval for speed
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, advertisersRes, scholarshipsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/students/'),
          axios.get('http://localhost:3000/api/v1/advertisers/'),
          axios.get('http://localhost:3000/api/v1/admin/scholarhips'),
        ]);

        setData({
          studentsCount: studentsRes.data.length,
          advertisersCount: advertisersRes.data.length,
          scholarshipsCount: scholarshipsRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colors = ['#008FFB', '#00E396', '#FEB019'];
  useEffect(() => {
    if (!loading && studentsCount === 0 && advertisersCount === 0 && scholarshipsCount === 0) {
      incrementCounter(data.studentsCount, setStudentsCount);
      incrementCounter(data.advertisersCount, setAdvertisersCount);
      incrementCounter(data.scholarshipsCount, setScholarshipsCount);
    }
  }, [data, loading]);

  return (
    <div className="home-container">
      <div className="image-container">
        {loading ? (
          <Skeleton variant="rectangular" width={500} height={500} />
        ) : (
          <iframe src="https://lottie.host/embed/7eb9c883-adbb-4fdb-94c6-a697e64b8f54/jZjKY4SR6q.json" width="500px" height="500px" loading="lazy" />
        )}
      </div>
      <div className="summary-container">
        {loading ? (
          <>
            <div className="summary-card" width='200px'>
              <Skeleton variant="text" width="200px" height={30} />
              <Skeleton variant="text" width="150px" height={50} />
            </div>
            <div className="summary-card">
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="50%" height={50} />
            </div>
            <div className="summary-card">
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="50%" height={50} />
            </div>
          </>
        ) : (
          <>
            <div className="summary-card">
              <h3>Students</h3>
              <p>{studentsCount}</p>
            </div>
            <div className="summary-card">
              <h3>Advertisers</h3>
              <p>{advertisersCount}</p>
            </div>
            <div className="summary-card">
              <h3>Scholarships</h3>
              <p>{scholarshipsCount}</p>
            </div>
          </>
        )}
      </div>
      <div className="pieChartContainer">
        {loading ? (
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
                    { id: 0, value: studentsCount, color: '#443a8f', label: 'Students' },
                    { id: 1, value: advertisersCount, color: '#3decae', label: 'Advertisers' },
                    { id: 2, value: scholarshipsCount, color: '#dc3545', label: 'Scholarships' },
                  ]
                  : [
                    { id: 0, value: studentsCount, label: 'Students Count', color: '#443a8f' },
                    { id: 1, value: advertisersCount, label: 'Advertisers Count', color: '#3decae' },
                    { id: 2, value: scholarshipsCount, label: 'Scholarships Count', color: '#dc3545' },
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
