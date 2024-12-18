import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';

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

    return (
        <PageContainer
            title="Application Details"
            breadcrumbs={<Typography>Dashboard / Scholarships / Applications / Application Details</Typography>}
            actions={
                <Box>
                    <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('accepted')}>
                        Accept
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleStatusUpdate('rejected')}>
                        Reject
                    </Button>
                </Box>
            }
        >
            {application && (
                <Box>
                    <Typography variant="h6">Student Name: {application.studentName}</Typography>
                    <Typography>Status: {application.status}</Typography>
                    {/* Add other details as needed */}
                </Box>
            )}
        </PageContainer>
    );
};

export default ApplicationDetails;
