import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Skeleton, Box, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import './search.css';

const ScholarshipList = ({ scholarships }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust this delay as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="list-container">
            {loading ? (
                // Skeletons displayed during loading
                Array.from(new Array(3)).map((_, index) => (
                    <Card key={index} className='scholarship-item'>
                        <Skeleton variant="text" height={40} width="60%" />
                        <Skeleton variant="rectangular" height={200} />
                        <CardContent>
                            <Skeleton variant="text" height={20} width="80%" />
                            <Skeleton variant="text" height={20} width="50%" />
                            <Skeleton variant="text" height={20} width="60%" />
                            <Skeleton variant="text" height={20} width="70%" />
                            <Skeleton variant="text" height={20} width="50%" />
                        </CardContent>
                    </Card>
                ))
            ) : (
                // Actual scholarship data displayed after loading
                scholarships.length === 0 ? (
                    <Typography>No scholarships found</Typography>
                ) : (
                    scholarships.map((scholarship) => (
                        <Card key={scholarship._id} className='scholarship-item'>
                            <h2 height="100px" className='card-header' style={{ color: '#418447' }}>
                                {scholarship.scholarsip_name}
                            </h2>
                            <CardMedia
                                component="img"
                                height="200px"
                                image={scholarship.scholarship_picture}
                                alt={scholarship.scholarsip_name}
                            />
                            <CardContent height="200px">
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {scholarship.brief_descrition}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Language of Study: {scholarship.language_Of_Study}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Place of Study: {scholarship.Place_of_Study}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    End date : {new Date(scholarship.End_Date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Expenses Covered: {scholarship.expenses_coverd}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing height="100px">
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <Link to='/scholarship-detail' className='deatils-scholarship-link '>View Details</Link>
                            </CardActions>
                        </Card>
                    ))
                )
            )}
        </div>
    );
};

export default ScholarshipList;
