import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';

const ApplicationsList = ({ advertiserId }) => {
    const [scholarships, setScholarships] = useState([]);
    const navigate = useNavigate();
    const { roleId } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (roleId) {
            fetchScholarships();
        }
    }, [roleId]);

    const fetchScholarships = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/accept`);
            setScholarships(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleScholarshipClick = (scholarshipId) => {
        navigate(`/applications/${scholarshipId}`);
    };

    return (
        <PageContainer title="Scholarship Applications" breadcrumbs={<Typography>Dashboard / Applications</Typography>}>
            {loading || !roleId ? (
                <div>
                    <Skeleton variant="text" width={410} height={60} />
                    <Skeleton variant="rectangular" width={800} height={400} style={{ marginTop: '10px' }} />
                </div>
            ) : (
                <List>
                    {scholarships.map((scholarship) => (
                        <ListItem button key={scholarship._id} onClick={() => handleScholarshipClick(scholarship._id)}>
                            <ListItemText
                                primary={scholarship.scholarsip_name}
                                secondary={`${scholarship.applicationsCount} applications`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </PageContainer>
    );
};

export default ApplicationsList;
