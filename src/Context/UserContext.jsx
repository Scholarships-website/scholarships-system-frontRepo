import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the context
export let UserContext = createContext(null);

// Create the provider component
export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({});

    // Fetch user ID from token
    const getUserID = async () => {
        if (userToken) {
            try {
                const { data } = await axios.get(`https://localhost:7107/api/Users/get-user-id-from-token`, {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });
                if (data && data.data) {
                    setUserId(data.data);  // Set user ID
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        }
    };

    // Fetch user info from user ID
    const getUserInfo = async () => {
        if (userId) {
            try {
                const { data } = await axios.get(`https://localhost:7107/api/Users/${userId}`);
                if (data && data.data) {
                    setUserData(data.data);  // Set user data
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    // UseEffect to check token in local storage
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);  // Set user token from local storage
        }
    }, []);

    // UseEffect to fetch user ID when token is available
    useEffect(() => {
        if (userToken) {
            getUserID();
        }
    }, [userToken]);

    // UseEffect to fetch user data when userId is available
    useEffect(() => {
        if (userId) {
            getUserInfo();
        }
    }, [userId]);

    return (
        <UserContext.Provider value={{ userToken, setUserToken, userId, setUserId, userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}
