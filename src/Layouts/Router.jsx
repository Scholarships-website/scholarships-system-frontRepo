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
import Advertiser from '../Components/Admin/Advertisers/Advertiser';
import Students from '../Components/Admin/Students/Students';
import AddAdvertiser from '../Components/Admin/Advertisers/AddAdvertiser';
import EditAdvertiser from '../Components/Admin/Advertisers/EditAdvertiser';
import Scholarships from '../Components/Admin/Scholarships/Scholarships';
import RequestedScholarships from '../Components/Admin/Scholarships/RequestedScholarships';
import Feedbacks from '../Components/Admin/Feedbacks/Feedbacks';
import Comments from '../Components/Admin/Comments/Comments';
import AddFeedback from '../Components/MainPage/Feedback/AddFeedback';
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
        path: "/dashboard",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "advertisers",
                element: <Advertiser />,
            },
            {
                path: "students",
                element: <Students />,
            },
            {
                path: "scholarships",
                element: <Scholarships />,
            },
            {
                path: "feedbacks",
                element: <Feedbacks />,
            },
            {
                path: "comments",
                element: <Comments />,
            },
            {
                path: "addAdvertiser",
                element: <AddAdvertiser />
            },
            {
                path: "editAdvertiser/:id",
                element: <EditAdvertiser />
            },
            // {
            //     path: "editTraining/:id",
            //     element: <EditTraining />
            // },
            {
                path: "*",
                element: <h2>page not found --- DashboardAdmin</h2>,
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
    {
        path: '/add-feedback',
        element: <AddFeedback />,
    },
]);
