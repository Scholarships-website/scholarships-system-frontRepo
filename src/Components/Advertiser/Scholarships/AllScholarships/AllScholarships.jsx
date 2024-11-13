import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AcceptedScholarships from '../AcceptedScholarships/AcceptedScholarships';
import PendingScholarships from '../PendingScholarships/PendingScholarships'; 
import RejectedScholarships from '../RejectedScholarships/RejectedScholarships'; 
import './AllScholarships.css'
function AllScholarships() {
    const [value, setValue] = useState(0); // Track the selected tab

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // You can fetch data here if needed when the component loads
    }, []);

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Scholarship status tabs">
                    <Tab label="Accepted" />
                    <Tab label="Pending" />
                    <Tab label="Rejected" />
                </Tabs>
            </Box>
            <Box sx={{ mt: 3 }}>
                {value === 0 && <AcceptedScholarships />}
                {value === 1 && <PendingScholarships />} 
                {value === 2 && <RejectedScholarships />}
            </Box>
        </div>
    );
}

export default AllScholarships;
