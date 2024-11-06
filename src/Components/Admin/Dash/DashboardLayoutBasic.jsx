import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faComments, faMessage, faPersonChalkboard, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import Students from '../Students/Students'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Advertiser from '../Advertisers/Advertiser';
import Scholarships from '../Scholarships/Scholarships';
import Feedbacks from '../Feedbacks/Feedbacks';
import Comments from '../Comments/Comments';
import AddAdvertiser from '../Advertisers/AddAdvertiser';
import { Box, Stack, Typography } from '@mui/material';
import { UserContext } from '../../../Context/UserContext';

import './Dash.css'


function LogoutButton() {
    const { setUserToken } = React.useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('userToken');  // Remove token
        setUserToken(null);  // Update context
        navigate('/login');  // Navigate to login page
    };

    return (
        <Box onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <Typography variant="body1" sx={{ ml: 1 }}>Logout</Typography>
        </Box>
    );
}
const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
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

// function useDemoRouter(initialPath) {

//     const [pathname, setPathname] = React.useState(initialPath);

//     const router = React.useMemo(() => {
//         return {
//             pathname,
//             searchParams: new URLSearchParams(),
//             navigate: (path) => setPathname(String(path)),
//         };
//     }, [pathname]);

//     return router;
// }
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
function DashboardLayoutBasic(props) {
    const { setUserToken } = React.useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();
    const NAVIGATION = [
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: 'dashboard',
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
            segment: 'dashboard/students',
            title: 'Students',
            icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
            content: <Students />,
        },
        {
            segment: 'dashboard/advertisers',
            title: 'Advertisers',
            icon: <FontAwesomeIcon icon={faUser} />,
            content: <Advertiser />,
        },
        {
            segment: 'dashboard/scholarships',
            title: 'Scholarships',
            icon: <FontAwesomeIcon icon={faBarsProgress} />,
            content: <Scholarships />,
        },
        {
            segment: 'dashboard/feedbacks',
            title: 'Feedbacks',
            icon: <FontAwesomeIcon icon={faMessage} />,
            content: <Feedbacks />,
        },
        {
            segment: 'dashboard/comments',
            title: 'Comments',
            icon: <FontAwesomeIcon icon={faComments} />,
            content: <Comments />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Forms',
        },
        {
            segment: 'dashboard/addAdvertiser',
            title: 'Add Advertisers',
            icon: <FontAwesomeIcon icon={faUser} />,
            content: <AddAdvertiser />,
        },
        {
            kind: 'divider',
        },
    ];
    const currentNavItem = NAVIGATION.find((item) => location.pathname === item.segment);

    React.useEffect(() => {
        const toolbarDiv = document.querySelector('.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-1dbvo5e-MuiToolbar-root');

        if (toolbarDiv && !toolbarDiv.querySelector('.logout-button')) {
            toolbarDiv.innerHTML += `
            <div class="logout-button" style="display: flex; align-items: center; cursor: pointer; margin-left: auto;">
            <i class="fa-solid fa-right-from-bracket"></i>
        </div>
            `;

            // Add event listener to handle logout on button click
            toolbarDiv.querySelector('.logout-button').addEventListener('click', () => {
                localStorage.removeItem('userToken');
                setUserToken(null);
                navigate('/login');
            });
        }
    }, [navigate, setUserToken]);
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
                <CustomBranding />
                <PageContainer>
                    {currentNavItem?.content || <Outlet />}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}

export default DashboardLayoutBasic;

