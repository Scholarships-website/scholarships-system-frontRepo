import React, { useState, useEffect } from 'react';
import { Typography, Checkbox, FormControlLabel, Slider, Box, IconButton, Drawer } from '@mui/material';
import { Menu, ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ scholarships, setFilteredScholarships }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        Place_of_Study: [],
        language_Of_Study: [],
        type: [],
    });
    const [filters, setFilters] = useState({
        Place_of_Study: [],
        language_Of_Study: [],
        type: [],
    });
    const [openFilters, setOpenFilters] = useState({
        Place_of_Study: true,
        language_Of_Study: true,
        type: true
    });

    const toggleFilter = (filter) => {
        setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
    };

    const minAmount = 0;
    const maxAmount = scholarships.length ? Math.max(...scholarships.map(s => s.expenses_coverd)) : 10000;
    const [amountRange, setAmountRange] = useState([minAmount, maxAmount]);

    const handleSliderChange = (event, newValue) => {
        setAmountRange(newValue);
    };

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/scholarships');
                const { data } = response;
                const uniqueOptions = {
                    Place_of_Study: [...new Set(data.map(item => item.Place_of_Study))],
                    language_Of_Study: [...new Set(data.map(item => item.language_Of_Study))],
                    type: [...new Set(data.map(item => item.type))],
                };
                setFilterOptions(uniqueOptions);
            } catch (error) {
                console.error('Error fetching filter options:', error);
            }
        };
        fetchFilterOptions();
    }, []);

    const handleFilterChange = (filterCategory, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterCategory]: prevFilters[filterCategory].includes(value)
                ? prevFilters[filterCategory].filter(item => item !== value)
                : [...prevFilters[filterCategory], value],
        }));
    };

    useEffect(() => {
        const applyFilters = () => {
            const filtered = scholarships.filter(scholarship => {
                const { Place_of_Study, language_Of_Study, type } = filters;
                return (
                    (Place_of_Study.length === 0 || Place_of_Study.includes(scholarship.Place_of_Study)) &&
                    (language_Of_Study.length === 0 || language_Of_Study.includes(scholarship.language_Of_Study)) &&
                    (type.length === 0 || type.includes(scholarship.type)) &&
                    scholarship.expenses_coverd >= amountRange[0] &&
                    scholarship.expenses_coverd <= amountRange[1]
                );
            });
            setFilteredScholarships(filtered);
        };
        applyFilters();
    }, [filters, amountRange, scholarships, setFilteredScholarships]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='sidebarSearch'>
            <IconButton
                className="hamburger-icon-side"
                onClick={toggleSidebar}
                sx={{ display: { xs: 'block', md: 'none' }, '@media (max-width: 830px)': { display: 'block' } }}
            >
                <Menu />
            </IconButton>
            <Drawer
                open={isSidebarOpen}
                onClose={toggleSidebar}
                variant="temporary"
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '@media (max-width: 830px)': { display: 'block' },
                    '& .MuiDrawer-paper': { width: 250, padding: 2 },
                }}
            >
                <div className="sidebar-search-open">
                    <h3>Filters</h3>
                    <Box className="filter-category">
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                            Place of Study
                            <IconButton onClick={() => toggleFilter('Place_of_Study')} sx={{ padding: '4px', marginLeft: '8px' }}>
                                {openFilters.Place_of_Study ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Typography>
                        {openFilters.Place_of_Study && filterOptions.Place_of_Study.map((place, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={filters.Place_of_Study.includes(place)}
                                        onChange={() => handleFilterChange('Place_of_Study', place)}
                                    />
                                }
                                label={place}
                            />
                        ))}
                    </Box>
                    <Box className="filter-category">
                        <Typography variant="body1">Language of Study
                            <IconButton onClick={() => toggleFilter('language_Of_Study')}>
                                {openFilters.language_Of_Study ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Typography>
                        {openFilters.language_Of_Study && filterOptions.language_Of_Study.map((language, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={filters.language_Of_Study.includes(language)}
                                        onChange={() => handleFilterChange('language_Of_Study', language)}
                                    />
                                }
                                label={language}
                            />
                        ))}
                    </Box>
                    <Box className="filter-category">
                        <Typography variant="body1">Type
                            <IconButton onClick={() => toggleFilter('type')}>
                                {openFilters.type ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Typography>
                        {openFilters.type && filterOptions.type.map((type, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={filters.type.includes(type)}
                                        onChange={() => handleFilterChange('type', type)}
                                    />
                                }
                                label={type}
                            />
                        ))}
                    </Box>
                    <Box className="filter-category">
                        <Typography variant="body1">Scholarship Amount</Typography>
                        <Slider
                            value={amountRange}
                            min={minAmount}
                            max={maxAmount}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            marks
                            step={100}
                            className="custom-slider"
                        />
                        <Typography variant="caption">
                            ${amountRange[0]} - ${amountRange[1]}
                        </Typography>
                    </Box>
                </div>
            </Drawer>
            {/* Sidebar for Medium+ Screens */}
            <Box className="sidebar-search" sx={{ display: { xs: 'none', md: 'block' }, '@media (max-width: 830px)': { display: 'none' } }}>
                <h3>Filters</h3>
                <Box className="filter-category">
                    <Typography variant="body1">Place of Study
                        <IconButton onClick={() => toggleFilter('Place_of_Study')}>
                            {openFilters.Place_of_Study ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Typography>
                    {openFilters.Place_of_Study && filterOptions.Place_of_Study.map((place, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox onChange={() => handleFilterChange('Place_of_Study', place)} />}
                            label={place}
                        />
                    ))}
                </Box>
                <Box className="filter-category">
                    <Typography variant="body1">Language of Study
                        <IconButton onClick={() => toggleFilter('language_Of_Study')}>
                            {openFilters.language_Of_Study ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Typography>
                    {openFilters.language_Of_Study && (
                        filterOptions.language_Of_Study.map((language, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox onChange={() => handleFilterChange('language_Of_Study', language)} />}
                                label={language}
                            />
                        ))
                    )}
                </Box>
                <Box className="filter-category">
                    <Typography variant="body1">Type
                        <IconButton onClick={() => toggleFilter('type')}>
                            {openFilters.type ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Typography>
                    {openFilters.type && (
                        filterOptions.type.map((type, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox onChange={() => handleFilterChange('type', type)} />}
                                label={type}
                            />
                        ))
                    )}
                </Box>
                <Box className="filter-category">
                    <Typography variant="body1">Scholarship Amount</Typography>
                    <Slider
                        value={amountRange}
                        min={minAmount}
                        max={maxAmount}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        marks
                        step={100}
                        className="custom-slider"
                    />
                    <Typography variant="caption">
                        ${amountRange[0]} - ${amountRange[1]}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default Sidebar;
