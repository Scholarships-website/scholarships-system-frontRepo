import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Loading from '../Components/Shared/Loading/Loading';

// Create the context
export let UserContext = createContext(null);

// Create the provider component
export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [roleId, setRoleId] = useState(null);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true); // Added loading state

    const logout = () => {
        setUserToken(null);
        setUserId(null);
        setRoleId(null);
        setUserData({});
        localStorage.removeItem('userToken');
        alert("Session expired. Please log in again.");
        setLoading(false); // Ensure loading stops after logout
    };

    const getUserID = async () => {
        if (userToken) {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/v1/getUserInfoFromToken`, {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });
                console.log('role id ' + data.RoleId);
                setUserId(data.userId);
                setRoleId(data.RoleId);
            } catch (error) {
                if (error.response && error.response.data.message === "jwt expired") {
                    console.error("Token expired:", error);
                    alert("Session expired. Please log in again.");
                    logout(); // Call logout on token expiration
                } else {
                    console.error("Error fetching user ID:", error);
                }
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token); // Set user token from local storage
        } else {
            setLoading(false); // No token found, stop loading
        }
    }, []);

    useEffect(() => {
        if (userToken) {
            getUserID().finally(() => setLoading(false)); // Ensure loading stops even if getUserID fails
        }
    }, [userToken]);

    const getUserInfo = async () => {
        if (userId) {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/v1/getUserInfo/${userId}`);
                console.log(data);
                setUserData(data);
            }
            catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    useEffect(() => {
        if (userId) {
            getUserInfo();
        }
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <UserContext.Provider value={{ userToken, setUserToken, userId, setUserId, userData, setUserData, roleId, setRoleId, logout }}>
            {children}
        </UserContext.Provider>
    );
}
