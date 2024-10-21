import React, { useContext, useEffect } from 'react'
import { BsJustify } from 'react-icons/bs'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext';

export default function DashHome({OpenSidebar}) {
  return (
    <>
    <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
    <Outlet/>
    </>
  )
}
