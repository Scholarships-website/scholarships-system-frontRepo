// import React from 'react'
import { useEffect } from 'react';
import Navbar from '../../Shared/Navbar/Navbar'
import * as React from 'react';
import { useState } from 'react';
// import ScholarshipList from './ScholarshipList';
import { Box, TextField } from '@mui/material'; // Importing Box and TextField from MUI



const SearchScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchScholarships = async () => {
            const response = await fetch('http://localhost:3000/api/v1/scholarships');
            const data = await response.json();
            setScholarships(data);
            setFilteredScholarships(data); // Initialize filtered scholarships
        };

        fetchScholarships();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = scholarships.filter((scholarship) =>
            scholarship.name.toLowerCase().includes(value) // Assuming scholarships have a 'name' property
        );
        setFilteredScholarships(filtered);
    };

    return (
        <Box display="flex">
            {/* <Sidebar scholarships={filteredScholarships} /> */}
            <Box flexGrow={1} p={2}>
                <TextField
                    label="Search Scholarships"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearch}
                    value={searchTerm}
                />
                <ScholarshipList scholarships={filteredScholarships} />
            </Box>
        </Box>
    );
};

export default SearchScholarships;