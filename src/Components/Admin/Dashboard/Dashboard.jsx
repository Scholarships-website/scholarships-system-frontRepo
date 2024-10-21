import React, { useContext } from 'react'
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import '../Dashboard.css'
import { GrCloudComputer } from "react-icons/gr";
import { FaWpforms } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBarsProgress, faCaretDown, faChevronDown, faComment, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineForm } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';

function Dashboard({ openSidebarToggle, OpenSidebar }) {
    const navigate = useNavigate();
    let { userToken, setUserToken } = useContext(UserContext);
    if (!userToken) {
        navigate('/login');
        return null; // Prevent rendering of the component
    }
    const logOut = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/login');
    }
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <a href="/">PalScholarships</a>
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item' >
                    <a href="/dashboard">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </a>
                </li>
                <li className='sidebar-list-item' >
                    <BsFillGrid3X3GapFill className='icon' /> Tables
                    <div className="items pt-4 ps-3">
                        <a href="/dashboard/students"  >
                            <FontAwesomeIcon icon={faPersonChalkboard} /> Students
                        </a>
                    </div>
                    <div className="items pt-4 ps-3" >
                        <a href="/dashboard/advertisers" >
                            <FontAwesomeIcon icon={faUser} /> Advertisers
                        </a>
                    </div>
                    <div className="items pt-4 ps-3" >
                        <a href="/dashboard/scholarships" >
                            <FontAwesomeIcon icon={faBarsProgress} /> Scholarships
                        </a>
                    </div>
                    <div className="items pt-4 ps-3" >
                        <a href="/dashboard/feedbacks" >
                            <FontAwesomeIcon icon={faComment} />
                            Feedbacks
                        </a>
                    </div>
                </li>
                <li className='sidebar-list-item' >
                    <AiOutlineForm className='icon' /> Forms
                    {/* <div className="items pt-4 ps-3">
                        <a href="/dashboard/manageStudent"  >
                            <GoDotFill className='icon' /> <FontAwesomeIcon icon={faPersonChalkboard} /> Students
                        </a>
                    </div> */}
                    <div className="items pt-4 ps-3" >
                        <a href="/dashboard/addAdvertiser" >
                            <FontAwesomeIcon icon={faUser} /> Advertisers
                        </a>
                    </div>
                    {/* <div className="items pt-4 ps-3" >
                        <a href="/dashboard/manageScholarships" >
                            <GoDotFill className='icon' /> <FontAwesomeIcon icon={faBarsProgress} /> Scholarships
                        </a>
                    </div> */}
                    {/* <div className="items pt-4 ps-3" >
                        <a href="/dashboard/manageFeedbacks" >
                            <GoDotFill className='icon' /> <FontAwesomeIcon icon={faBarsProgress} /> Feedbacks
                        </a>
                    </div> */}
                </li>
                <li className='sidebar-list-item' >
                    <div className="items pt-4 ps-3" >
                        <button className='bg-transparent border-0 logout' onClick={logOut} >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#f0f3fa", }} /> Logout
                        </button>
                    </div>
                </li>
            </ul>
        </aside>
    )
}

export default Dashboard