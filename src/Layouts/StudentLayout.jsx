import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentDashboard from '../Components/Student/StudentDashboard/StudentDashboard'
import StudentRoute from '../Components/Auth/ProtectedRoutes/StudentRoute'

function StudentLayout() {
    return (
        <StudentRoute>
            <StudentDashboard />
        </StudentRoute>
    )
}

export default StudentLayout