import React from 'react';
import { Box, Typography, Breadcrumbs, Button } from '@mui/material';

const PageContainer = ({ title, breadcrumbs, actions, children }) => (
    <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
                {breadcrumbs && <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>}
                <Typography variant="h4" component="h1">{title}</Typography>
            </Box>
            <Box>{actions}</Box>
        </Box>
        <Box>{children}</Box>
    </Box>
);

export default PageContainer;
