import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import Skeleton from '@mui/material/Skeleton';

// ApexChart component
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: props.data, // Use data passed from props
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              // Handle click event if needed
            }
          }
        },
        colors: props.colors || ['#008FFB', '#00E396', '#FEB019'], // Default colors
        plotOptions: {
          bar: {
            columnWidth: '70%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        tooltip: {
          enabled: true,
          // Customize tooltip to show only values without the series label
          formatter: function (val, { seriesIndex }) {
            return val; // Return only the value
          }
        },
        xaxis: {
          categories: props.categories || [], // Use categories passed from props
          labels: {
            style: {
              colors: props.colors || ['#008FFB', '#00E396', '#FEB019'],
              fontSize: '12px'
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
      </div>
    );
  }
}

export default function Home() {
  const { userToken, setUserToken, userData } = useContext(UserContext);
  const [data, setData] = useState({
    studentsCount: 0,
    advertisersCount: 0,
    scholarshipsCount: 0,
  });
  const [loading, setLoading] = useState(true);

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

  const colors = ['#008FFB', '#00E396', '#FEB019']; // Define your color array

  return (
    <div className="home-container">
      {/* Skeleton for Lottie animation */}
      <div className="image-container">
        {loading ? (
          <Skeleton variant="rectangular" width={500} height={500} />
        ) : (
          <iframe src="https://lottie.host/embed/7eb9c883-adbb-4fdb-94c6-a697e64b8f54/jZjKY4SR6q.json" width="500px" height="500px" />
        )}
      </div>
      <div className="summary-container">
        {loading ? (
          <>
            <div className="summary-card">
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="50%" height={50} />
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
              <p>{data.studentsCount}</p>
            </div>
            <div className="summary-card">
              <h3>Advertisers</h3>
              <p>{data.advertisersCount}</p>
            </div>
            <div className="summary-card">
              <h3>Scholarships</h3>
              <p>{data.scholarshipsCount}</p>
            </div>
          </>
        )}
      </div>
      <div className="pieChartContainer">
        {loading ? (
          <Skeleton variant="rectangular" width={600} height={400} />
        ) : (
          <ApexChart
            data={[data.studentsCount, data.advertisersCount, data.scholarshipsCount]}
            categories={['Students', 'Advertisers', 'Scholarships']}
            colors={colors}
          />
        )}
      </div>
    </div>
  );
}
