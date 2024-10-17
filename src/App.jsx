import React, { useContext, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { RouterProvider } from "react-router-dom";
import { router } from './Layouts/Router.jsx';
import UserContextProvider, { UserContext } from './Context/UserContext.jsx';  // Import the default and named exports

export default function App() {
  return (
    <UserContextProvider>
      <MainApp />
    </UserContextProvider>
  );
}

function MainApp() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [setUserToken]);

  return (
    <RouterProvider router={router} />
  );
}