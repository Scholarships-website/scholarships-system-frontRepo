import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';

const StudentApplications = () => {
    const { scholarshipId } = useParams();
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/scholarships/${scholarshipId}/Applied-students`)
            .then(response => setApplications(response.data))
            .catch(error => console.error('Error fetching applications', error));
    }, [scholarshipId]);

    const handleApplicationClick = (applicationId) => {
        navigate(`/applications/${scholarshipId}/details/${applicationId}`);
    };

    return (
        <PageContainer
            title="Student Applications"
            breadcrumbs={<Typography>Dashboard / Scholarships / Applications</Typography>}
        >
            <List>
                {applications.map((app) => (
                    <ListItem button key={app.id} onClick={() => handleApplicationClick(app.id)}>
                        <ListItemText
                            primary={app.studentName}
                            secondary={`Status: ${app.status}`}
                        />
                    </ListItem>
                ))}
            </List>
        </PageContainer>
    );
};

export default StudentApplications;
