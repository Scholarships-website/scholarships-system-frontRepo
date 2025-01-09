import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import Comments from './Comments'
import ReportedComments from './ReportedComments'

function ScholarshipsComment() {
    const [value, setValue] = useState(0); // Track the selected tab

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Scholarship Comments">
                    <Tab label="Comments" />
                    <Tab label="Reported Comments" />
                </Tabs>
            </Box>
            <Box sx={{ mt: 2 }}>
                {value === 0 && <Comments />}
                {value === 1 && <ReportedComments />}
            </Box>
        </div>
    )
}

export default ScholarshipsComment