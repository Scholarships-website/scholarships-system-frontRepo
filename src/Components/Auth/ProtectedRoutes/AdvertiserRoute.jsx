import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function AdvertiserRoute({ children }) {
    let { userToken, setUserToken, userId, setUserId, userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const AdvertiserAuth = () => {
        if (userData) {
            if (userToken == null) {
                return navigate('/login')
            }
            else if (userData.role != 'advertiser') {
                localStorage.removeItem('userToken');
                return navigate('/login')
            }
        }
    }
    useEffect(() => {
        AdvertiserAuth()
    }, [userData])
    return children
}
