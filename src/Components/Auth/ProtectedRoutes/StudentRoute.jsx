import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function StudentRoute({ children }) {
    let { userToken, setUserToken, userId, setUserId, userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const StudentAuth = () => {
        if (userData) {
            if (userToken == null) {
                return navigate('/login')
            }
            else if (userData.role != 'student') {
            localStorage.removeItem('userToken');
            return navigate('/login')
        }
        }
        
    }
    useEffect(() => {
        StudentAuth()
    }, [userData])

    return children
}
