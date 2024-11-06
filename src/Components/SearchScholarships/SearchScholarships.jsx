import { useEffect } from 'react';
import Navbar from '../Shared/Navbar/Navbar'
import * as React from 'react';
import { useState } from 'react';
import Sidebar from './Sidebar'
import ScholarshipList from './ScholarshipList';
import { Box, InputAdornment, Pagination, TextField } from '@mui/material';
import './search.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';



const SearchScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(9); 
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const fetchScholarships = async () => {
            const response = await axios.get(`http://localhost:3000/api/v1/scholarships`);
            console.log(response.data);
            setScholarships(response.data);
            setFilteredScholarships(response.data);
        };
        window.scrollTo(0, 0);
        fetchScholarships();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = scholarships.filter((scholarship) =>
            scholarship.scholarsip_name.toLowerCase().includes(value) 
        );
        setFilteredScholarships(filtered);
    };

    const totalPages = Math.ceil(filteredScholarships.length / limit);
    const displayedScholarships = filteredScholarships.slice((page - 1) * limit, page * limit);

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handleIconClick = () => {
        setIsClicked(true);
    };
    return (
        <>
            <Navbar />
            <div className='layout-container'>
                <Sidebar scholarships={scholarships}
                    setFilteredScholarships={setFilteredScholarships} />
                <div display="flex" className='search-main-container'>
                    <div className='search-column' >
                        <div className="search-bar">
                            <TextField
                                label="Search Scholarships"
                                variant="outlined"
                                fullWidth
                                onChange={handleSearch}
                                value={searchTerm}
                                onClick={handleIconClick}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                                onClick={handleIconClick}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: isClicked ? '#418447' : 'gray', 
                                        },
                                        '&:hover fieldset': {
                                            borderColor: isClicked ? '#418447' : 'gray',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: isClicked ? '#418447' : 'gray',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: isClicked ? '#418447' : 'gray', 
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: isClicked ? '#418447' : 'gray',
                                    },
                                }}
                            />
                        </div>
                        <ScholarshipList scholarships={displayedScholarships} />
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            className='pagination-search'
                            size="large"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchScholarships;