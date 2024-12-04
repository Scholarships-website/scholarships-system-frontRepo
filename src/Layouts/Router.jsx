import React from 'react';
import { createBrowserRouter } from "react-router-dom";
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
import Feedbacks from '../Components/Admin/Feedbacks/Feedbacks';
import Comments from '../Components/Admin/Comments/Comments';
import AddFeedback from '../Components/AddFeedback/AddFeedback';
import SearchScholarships from '../Components/SearchScholarships/SearchScholarships';
import ScholarshipDetail from '../Components/ScholarshipDetail/ScholarshipDetail';
import Contact from '../Components/Contact/Contact';
import DashboardLayoutBasic from '../Components/Admin/Dash/DashboardLayoutBasic';
import AcceptedScholarships from '../Components/Advertiser/Scholarships/AcceptedScholarships/AcceptedScholarships';
import AllScholarships from '../Components/Advertiser/Scholarships/AllScholarships/AllScholarships';
import PendingScholarships from '../Components/Advertiser/Scholarships/PendingScholarships/PendingScholarships';
import RejectedScholarships from '../Components/Advertiser/Scholarships/RejectedScholarships/RejectedScholarships';
import AddScholarships from '../Components/Advertiser/Scholarships/AddScholarship/AddScholarships';
import EditScholarship from '../Components/Advertiser/Scholarships/EditScholarship/EditScholarship';
import ApplicationsList from '../Components/Advertiser/Applications/ApplicationsList';
import ScholarshipsFeedbacks from '../Components/Advertiser/Feedbacks/ScholarshipsFeedbacks';
import StudentApplications from '../Components/Advertiser/Applications/StudentApplications';
import HomeAdvertiser from '../Components/Advertiser/Home/HomeAdvertiser';
import ResetPassword from '../Components/Shared/Login/ForgetPass/ResetPassword';
import Applications from '../Components/Student/Application/Applications';
import Wishlist from '../Components/Student/Wishlist/Wishlist';
import HomeStudent from '../Components/Student/Home/HomeStudent';
import Profile from '../Components/Student/Profile/Profile';
import Apply from '../Components/Apply/Apply';
export const router = createBrowserRouter([
    {
        path: "/studentDashboard",
        element: <StudentLayout />,
        children: [
            {
                path: "",
                element: <HomeStudent />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "applications",
                element: <Applications />,
            },
            {
                path: "wishlist",
                element: <Wishlist />,
            },
            {
                path: "*",
                element: <h2>Page not found — Student Dashboard</h2>,
            },
        ],
    },
    {
        path: "/advertiserDashboard",
        element: <AdvertiserLayout />,
        children: [
            {
                path: "*",
                element: <h2>Page not found — Advertiser Dashboard</h2>,
            },
            {
                path: "",
                element: <HomeAdvertiser />,
            },
            {
                path: "scholarship-advertiser",
                element: <AllScholarships />,
            },
            {
                path: "scholarship-advertiser/accepted",
                element:<AcceptedScholarships />,
            },
            {
                path: "scholarship-advertiser/pending",
                element:<PendingScholarships />,
            },
            {
                path: "scholarship-advertiser/rejected",
                element:<RejectedScholarships />,
            },
            {
                path: "post-scholarship",
                element:<AddScholarships />,
            },
            {
                path: "edit-scholarship/:id",
                element: <EditScholarship />,
            },
            {
                path: "applications",
                element: <ApplicationsList />,
            },
            ///applications/${scholarshipId}
            {
                path: "applications/:id",
                element: <StudentApplications />,
            },
            {
                path: "feedbacks",
                element: <ScholarshipsFeedbacks />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <AdminLayout/>,
        children: [
            {
                path: "",
                element: <Home />,
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
                element: <AddAdvertiser />,
            },
            {
                path: "editAdvertiser/:id",
                element: <EditAdvertiser />,
            },
            {
                path: "*",
                element: <h2>Page not found — Dashboard Admin</h2>,
            },
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
        path: '/forgot-password',
        element: <ForgetPassword />,
    },
    {
        path: '/resetPassword/:resetToken',
        element: <ResetPassword />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/add-feedback',
        element: <AddFeedback />,
    },
    {
        path: '/search-scholarships',
        element: <SearchScholarships />,
    },
    {
        path: '/scholarship-detail/:id',
        element: <ScholarshipDetail />,
    },
    {
        path: '/contact-us',
        element: <Contact />,
    },
    {
        path: '/apply-for-scholarship',
        element: <Apply />,
    },
]);
