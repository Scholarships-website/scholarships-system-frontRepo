import React from 'react'
import { Outlet } from 'react-router-dom'
import AdvertiserDashboard from '../Components/Advertiser/AdvertiserDashboard/AdvertiserDashboard'

function AdvertiserLayout() {
    return (
        <div>
            <AdvertiserDashboard />
        </div>
    )
}

export default AdvertiserLayout