import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';

export default function AdminRoute({ children }) {
  const { userId  } = useContext(UserContext);
  const [userData, setUserData] = useState();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = async () => {
    if (userId) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getUserInfo/${userId}`);
        console.log('Fetched user data:', data); // Debug fetched data
        setUserData(data); // Update context with fetched data
        setIsLoading(false); // Data is now available
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('userToken');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
      return;
    }

    if (!userData || Object.keys(userData).length === 0) {
      getUserInfo(); // Fetch user data if it's empty or not available
    } else {
      setIsLoading(false); // Data is already available
    }
  }, [userId, userData, navigate, setUserData]);

  useEffect(() => {
    if (userData && userData.role !== "admin") {
      console.log('User is not an admin. Redirecting to login...');
      localStorage.removeItem('userToken');
      navigate('/login');
    }
  }, [userData, navigate]);

  if (isLoading) {
    return <Loading />; // Show a loading spinner
  }

  return children;
}