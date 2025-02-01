import React, { useState } from 'react'
import Dashboard from '../Components/Admin/Dash/DashboardLayoutBasic'
import AdminRoute from '../Components/Auth/ProtectedRoutes/AdminRoute'

export default function AdminLayout() {

    return (
        <AdminRoute>
                <Dashboard />
        </AdminRoute>
    )
}