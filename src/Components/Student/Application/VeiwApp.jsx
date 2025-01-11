import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Button, Typography, Box, Tab, Tabs, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import PageContainer from '../../Advertiser/Applications/PageContainer';
import axios from 'axios';
import GeneralInformation from '../../Advertiser/Applications/GeneralInformation';
import FamilyInformation from '../../Advertiser/Applications/FamilyInformation';
import EducationalData from '../../Advertiser/Applications/EducationalData';
import HealthStatus from '../../Advertiser/Applications/HealthStatus';
import Identifiers from '../../Advertiser/Applications/Identifiers';
import Attachments from '../../Advertiser/Applications/Attachments';
import Swal from 'sweetalert2';
import moment from 'moment';
import { toast } from 'react-toastify';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../Shared/Loading/Loading';
function VeiwApp() {
    const { _id } = useParams();
    const [application, setApplication] = useState(null);
    const [studentData, setStudent] = useState(null);
    const [loading, setLoading] = useState(true); 

    const location = useLocation();
    console.log(application)


    useEffect(() => {
        const fetchApplicationAndStudent = async () => {
            try {
                setLoading(true);
                const applicationResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/applications/${_id}`);
                const applicationData = applicationResponse.data;
                setApplication(applicationData);
                // console.log('Application Data:', applicationData);

                // Extract student_id from the application data
                const studentId = applicationData.student_id;

                // Second API call to get the student details using student_id
                const studentResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getStudentDataFromId/${studentId}`);
                setStudent(studentResponse.data);
                // console.log('Student Data:', studentData);

            } catch (error) {
                console.error('Error fetching application or student details:', error);
            }
            finally {
                setLoading(false); // Stop loading
            }
        };

        fetchApplicationAndStudent();
    }, [_id]);

    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if (loading) {
        return <Loading />; // Show Loading component while data is being fetched
    }
    return (
        <PageContainer
            actions={
                <>
                    {application && application.status === "pending" && (
                        <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#4CAF50",
                                    "&:hover": {
                                        backgroundColor: "#45a049",
                                    },
                                    // marginRight: 2,
                                }}
                            >
                                <Link
                                    style={{ textDecoration: 'none', color: '#fff' }}
                                    to={`/studentDashboard/applications/edit-application/${application._id}`}
                                    state={{  application: application,student:studentData }}
                                >
                                    Edit Application
                                </Link>
                            </Button>
                        </Box>
                    )}
                </>
            }
        >
            <Box sx={{ width: "100%", mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Application Details
                </Typography>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="General Information" />
                    <Tab label="Family Information" />
                    <Tab label="Educational Data" />
                    <Tab label="Health Status" />
                    <Tab label="Identifiers" />
                    <Tab label="Attachments" />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    {currentTab === 0 && application && studentData && (<GeneralInformation data={{ application, studentData }} />)}
                    {currentTab === 1 && application && (<FamilyInformation data={{ application }} />)}
                    {currentTab === 2 && application && (<EducationalData data={{ application }} />)}
                    {currentTab === 3 && application && (<HealthStatus data={{ application }} />)}
                    {currentTab === 4 && application && (<Identifiers data={{ application }} />)}
                    {currentTab === 5 && application && (<Attachments data={{ application }} />)}
                </Box>
            </Box>
        </PageContainer>
    );
}
export default VeiwApp