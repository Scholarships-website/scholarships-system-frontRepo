import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  let { userToken, setUserToken, userId, setUserId, userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const AdminAuth = () => {
    if (userData) {
      if (userToken == null) {
        return navigate('/login')
      }
      else if (userData.role != 'admin') {
        localStorage.removeItem('userToken');
        return navigate('/login')
      }
    }
  }
  useEffect(() => {
    AdminAuth()
  }, [userData])

  return children
}
