import React, { useContext, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { router } from './Layouts/Router.jsx';
import UserContextProvider, { UserContext } from './Context/UserContext.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bounce, ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <UserContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
        <MainApp />
    </UserContextProvider>
  );
}

function MainApp() {
  let { setUserToken } = useContext(UserContext);
  // List of public routes

  // const { userToken, setUserToken } = useContext(UserContext);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const publicRoutes = ["/", "/about", "/contact", "/login", "/register"];

  // useEffect(() => {
  //   // Check if the current route is not public and token is missing
  //   if (!userToken && !publicRoutes.includes(location.pathname)) {
  //     navigate('/login'); // Redirect to login for protected routes without token
  //   }
  // }, [userToken, location.pathname, navigate]);
  
  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [setUserToken]);

  return (
    <RouterProvider router={router} />
  );
}