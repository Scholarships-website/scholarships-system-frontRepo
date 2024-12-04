import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { PieChart } from '@mui/x-charts';
import Loading from '../../Shared/Loading/Loading';

export default function HomeAdvertiser() {
    const { userToken, setUserToken, userData, roleId } = useContext(UserContext);
    const [data, setData] = useState({
        acceptedCount: 0,
        pendingCount: 0,
        rejectedCount: 0,
    });
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Function to animate counter
    const incrementCounter = (targetCount, setCounter) => {
        let currentCount = 0;
        const interval = setInterval(() => {
            if (currentCount < targetCount) {
                currentCount += Math.ceil(targetCount / 100); // Gradually increase
                setCounter(currentCount);
            } else {
                clearInterval(interval); // Stop once target is reached
            }
        }, 70); // Adjust time interval for speed
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [accepted, pending, rejected] = await Promise.all([
                    axios.get(`http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/accept`),
                    axios.get(`http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/pending`),
                    axios.get(`http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/reject`),
                ]);

                setData({
                    acceptedCount: accepted.data.length,
                    pendingCount: pending.data.length,
                    rejectedCount: rejected.data.length,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roleId]);

    useEffect(() => {
        if (!loading && acceptedCount === 0 && pendingCount === 0 && rejectedCount === 0) {
            incrementCounter(data.acceptedCount, setAcceptedCount);
            incrementCounter(data.pendingCount, setPendingCount);
            incrementCounter(data.rejectedCount, setRejectedCount);
        }
    }, [data, loading]);

    if (!roleId) {
        return <Loading />;
    }

    const colors = ['#008FFB', '#00E396', '#FEB019'];

    return (
        <div className="home-container">
            <h2 className="d-flex align-items-center">
                Hi {userData.username}
                <img src="src/assets/img/hi.gif" alt="example-gif" width="40px" />
                !
            </h2>
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
                        <div className="summary-card" width="200px">
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
                            <h3>Accepted Scholarships</h3>
                            <p>{acceptedCount}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Pending Scholarships</h3>
                            <p>{pendingCount}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Rejected Scholarships</h3>
                            <p>{rejectedCount}</p>
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
                                        { id: 0, value: acceptedCount, color: '#443a8f', label: 'Accepted' },
                                        { id: 1, value: pendingCount, color: '#3decae', label: 'Pending' },
                                        { id: 2, value: rejectedCount, color: '#dc3545', label: 'Rejected' },
                                    ]
                                    : [
                                        { id: 0, value: acceptedCount, label: 'Accepted Scholarships', color: '#443a8f' },
                                        { id: 1, value: pendingCount, label: 'Pending Scholarships', color: '#3decae' },
                                        { id: 2, value: rejectedCount, label: 'Rejected Scholarships', color: '#dc3545' },
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
