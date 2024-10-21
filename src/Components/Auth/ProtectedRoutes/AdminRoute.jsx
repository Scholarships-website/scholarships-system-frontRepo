// import React, { useContext, useEffect } from 'react'
// import { UserContext } from '../../../Context/UserContext';
// import { useNavigate } from 'react-router-dom';

// export default function AdminRoute({ children }) {
//   let { userToken, setUserToken} = useContext(UserContext);

//   // let { userToken, setUserToken, userId, setUserId, userData, setUserData } = useContext(UserContext);
//   const navigate = useNavigate();

//   const AdminAuth = () => {
//     if (userData) {
//       if (localStorage.getItem("userToken") == null) {
//         navigate('/login')
//       }
//     }
//   }
//   useEffect(() => {
//     AdminAuth()
//   }, [userData])

//   return children
// }
