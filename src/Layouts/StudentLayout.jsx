import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentDashboard from '../Components/Student/StudentDashboard/StudentDashboard'

function StudentLayout() {
    return (
        <>
        <StudentDashboard/>
        </>
    )
}

export default StudentLayout