import React from 'react'
import { Outlet } from 'react-router-dom'
import AdvertiserDashboard from '../Components/Advertiser/AdvertiserDashboard/AdvertiserDashboard'
import AdvertiserRoute from '../Components/Auth/ProtectedRoutes/AdvertiserRoute'

function AdvertiserLayout() {
    return (
        <AdvertiserRoute>
            <div>
                <AdvertiserDashboard />
            </div>
        </AdvertiserRoute>
    )
}

export default AdvertiserLayout