import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box, Tab, Tabs } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';
import GeneralInformation from './GeneralInformation';
import FamilyInformation from './FamilyInformation';
import EducationalData from './EducationalData';
import HealthStatus from './HealthStatus';
import Identifiers from './Identifiers';
import Attachments from './Attachments';

const ApplicationDetails = () => {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);

    useEffect(() => {
        axios.get(`/api/v1/applications/${applicationId}`)
            .then(response => setApplication(response.data))
            .catch(error => console.error('Error fetching application details', error));
    }, [applicationId]);

    const handleStatusUpdate = (status) => {
        axios.post(`/api/v1/applications/${applicationId}/status`, { status })
            .then(() => setApplication(prev => ({ ...prev, status })))
            .catch(error => console.error('Error updating application status', error));
    };
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <PageContainer
            breadcrumbs={<Typography>Dashboard / Scholarships / Applications / Application Details</Typography>}
            actions={
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#4CAF50",
                            "&:hover": {
                                backgroundColor: "#45a049", 
                            },
                            marginRight: 2, 
                        }}
                        onClick={() => handleStatusUpdate("accepted")}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#F44336", 
                            "&:hover": {
                                backgroundColor: "#e53935", 
                            },
                        }}
                        onClick={() => handleStatusUpdate("rejected")}
                    >
                        Reject
                    </Button>
                </Box>
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
                    {currentTab === 0 && <GeneralInformation data={application} />}
                    {currentTab === 1 && <FamilyInformation data={application} />}
                    {currentTab === 2 && <EducationalData data={application} />}
                    {currentTab === 3 && <HealthStatus data={application} />}
                    {currentTab === 4 && <Identifiers data={application} />}
                    {currentTab === 5 && <Attachments data={application} />}
                </Box>
            </Box>
        </PageContainer>
    );
};

export default ApplicationDetails;
