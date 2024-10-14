import React from 'react'
import { createBrowserRouter, } from "react-router-dom";
import Login from '../Components/Shared/Login/Login';
import MainPage from '../Components/MainPage/MainPage';
import StudentLayout from './StudentLayout';
import StudentDashboard from '../Components/Student/StudentDashboard/StudentDashboard';
import AdminLayout from './AdminLayout';
import Home from '../Components/Admin/DashHome/Home';
import AdvertiserLayout from './AdvertiserLayout';
import AdvertiserDashboard from '../Components/Advertiser/AdvertiserDashboard/AdvertiserDashboard';
import ForgetPassword from '../Components/Shared/Login/ForgetPass/ForgetPassword';
import SignUp from '../Components/Shared/SignUp/SignUp';
export const router = createBrowserRouter([
    {
        path: "/PalScolarships",
        element: <StudentLayout />,
        children: [
            {
                path: "",
                element: <StudentDashboard />,
            },
            {
                path: "*",
                element: <h2>page not found --- Student dashboard</h2>,
            }
        ],
    },

    {
        path: "/adminDashboard",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "*",
                element: <h2>page not found --- AdminDashboard</h2>,
            },
        ],
    },
    {
        path: "/AdvertiserDashboard",
        element: <AdvertiserLayout />,
        children: [
            {
                path: "",
                element: <AdvertiserDashboard />,
            },
            {
                path: "*",
                element: <h2>page not found --- Advertiser dashboard</h2>,
            }
        ],
    },
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: "forgot-password",
        element: <ForgetPassword />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
]);
