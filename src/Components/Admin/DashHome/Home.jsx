import React, { useContext } from 'react'
import './Home.css'
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { BarChart } from '@mui/x-charts';

export default function Home() {
  let { userToken, setUserToken, userData } = useContext(UserContext);
  const [data, setData] = useState({
    studentsCount: 0,
    advertisersCount: 0,
    scholarshipsCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="home-container">
        {/* <h1 className='ps-3 pt-3 pb-3 mt-3'><span className='border border-2 p-2 border-primary-subtle border'>Welcome "{userData.firstName} {userData.lastName}"</span></h1> */}
        <div className="image-container">
          <iframe src="https://lottie.host/embed/7eb9c883-adbb-4fdb-94c6-a697e64b8f54/jZjKY4SR6q.json" width="500px" height="500px" />
        </div>
        <div className="summary-container">
          <div className="summary-card">
            <h3>Students</h3>
            <p>{data.studentsCount}</p>
            {/* <p>{calculateChange(data.studentsCount, lastMonthData.studentsCount)} since last month</p> */}
          </div>
          <div className="summary-card">
            <h3>Advertisers</h3>
            <p>{data.advertisersCount}</p>
            {/* <p>{calculateChange(data.advertisersCount, lastMonthData.advertisersCount)} since last month</p> */}
          </div>
          <div className="summary-card">
            <h3>Scholarships</h3>
            <p>{data.scholarshipsCount}</p>
            {/* <p>{calculateChange(data.scholarshipsCount, lastMonthData.scholarshipsCount)} since last month</p> */}
          </div>
        </div>
        <div className="pieChartContainer">
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Students', 'Advertisers', 'Scholarships'] }]}
            series={[{ data: [data.studentsCount, data.advertisersCount, data.scholarshipsCount] }]}
            width={600}
            height={400}
          />
        </div>


      </div>

    </>
  )
}