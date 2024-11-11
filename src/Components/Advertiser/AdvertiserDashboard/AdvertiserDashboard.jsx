import * as React from 'react';
import { createTheme, extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faCircleCheck, faCircleXmark, faClock, faComments, faMessage, faPersonChalkboard, faPlus, faSchoolFlag, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

import { UserContext } from '../../../Context/UserContext';
import AcceptedScholarships from '../AcceptedScholarships/AcceptedScholarships';
import AllScholarships from '../AllScholarships/AllScholarships';
import PendingScholarships from '../PendingScholarships/PendingScholarships';
import RejectedScholarships from '../RejectedScholarships/RejectedScholarships';
import AddScholarships from '../AddScholarship/AddScholarships';

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 1200,
            md: 1200,
            lg: 1200,
            xl: 1536,
        },
    },
});

function CustomBranding() {
    const location = useLocation();
    React.useEffect(() => {
        const brandingElement = document.querySelector('.css-1d9cypr-MuiStack-root');
        if (brandingElement) {
            brandingElement.innerHTML = `
                <Stack direction="row" className="logo-container-admin" alignItems="center" spacing={1} sx={{ p: 2, width: '100%' }} style="
                display: contents;
            ">
                    <img src="/assets/img/logo.png" alt="Logo" width="60" height="40" />
                    <Typography variant="h6">PalScholarships</Typography>
                </Stack>`
        }
    }, []);
    return null;
}

function AdvertiserDashboard(props) {
    const { window } = props;
    const { setUserToken } = React.useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const NAVIGATION = [
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: 'advertiserDashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Tables',
        },
        {
            segment: 'advertiserDashboard/scholarship-advertiser',
            title: 'Scholarships',
            icon: <FontAwesomeIcon icon={faSchoolFlag} />,
            content:<AllScholarships/>,
            children: [
                {
                    segment: 'accepted',
                    title: 'Accepted',
                    icon: <FontAwesomeIcon icon={faCircleCheck} />,
                    content: <AcceptedScholarships />,
                },
                {
                    segment: 'pending',
                    title: 'Pending',
                    icon: <FontAwesomeIcon icon={faClock} />,
                    content:<PendingScholarships/>
                },
                {
                    segment: 'rejected',
                    title: 'Rejected',
                    icon: <FontAwesomeIcon icon={faCircleXmark} />,
                    content:<RejectedScholarships/>
                },
            ],
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Forms',
        },
        {
            segment: 'advertiserDashboard/post-scholarship',
            title: 'Add Scholarship',
            icon: <FontAwesomeIcon icon={faPlus} />,
            content: <AddScholarships />,
        },
    ];
    const currentNavItem = NAVIGATION.find((item) => location.pathname === item.segment);

    const CustomToolbar = () => {
        const { setUserToken } = React.useContext(UserContext);
        const navigate = useNavigate();
        React.useEffect(() => {
            // Select the toolbar more specifically if possible
            const toolbarDiv = document.querySelector('.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-1dbvo5e-MuiToolbar-root');

            // Only add logout button if it's not already there
            if (toolbarDiv && !toolbarDiv.querySelector('.logout-button')) {
                // Create the logout button
                const logoutButton = document.createElement('div');
                logoutButton.classList.add('logout-button');
                logoutButton.style.display = 'flex';
                logoutButton.style.alignItems = 'center';
                logoutButton.style.cursor = 'pointer';
                logoutButton.style.marginLeft = 'auto';
                const icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-right-from-bracket');
                icon.style.color = '#757575';
                logoutButton.appendChild(icon);
                // Append logout button to the toolbar
                toolbarDiv.appendChild(logoutButton);
                // Add event listener to the logout button
                const handleLogout = () => {
                    localStorage.removeItem('userToken');
                    setUserToken(null);
                    navigate('/login');
                };
                logoutButton.addEventListener('click', handleLogout);
                // Cleanup: Remove event listener and button when the component unmounts
                return () => {
                    logoutButton.removeEventListener('click', handleLogout);
                    toolbarDiv.removeChild(logoutButton);
                };
            }
        }, [navigate, setUserToken]);
        return null;
    };
    return (
        <AppProvider
            navigation={NAVIGATION.map((item) => ({
                ...item,
                onClick: item.onClick || (() => item.segment && navigate(`${item.segment}`)),
                isActive: location.pathname === item.segment,
            }))}
            theme={demoTheme}
            window={props.window ? props.window() : undefined}
        >
            <DashboardLayout>
                <CustomToolbar />
                <CustomBranding />
                <PageContainer>
                    {currentNavItem?.content || <Outlet />}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    )
}

export default AdvertiserDashboard