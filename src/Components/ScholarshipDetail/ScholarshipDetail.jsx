import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import './ScholarshipDetail.css';
import Navbar from '../Shared/Navbar/Navbar';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScholarshipFeedback from './ScholarshipFeedback';
import moment from 'moment';
import { UserContext } from '../../Context/UserContext';

const ScholarshipDetail = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarScholarships, setSimilarScholarships] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const { roleId } = useContext(UserContext);
  const [status, setStatus] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${id}`);
        setScholarship(response.data);
        setEndDate(response.data.End_Date)
        const applicationsResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/${roleId}/applications`);
        const applicationIds = applicationsResponse.data;

        let applied = false;
        for (let i = 0; i < applicationIds.length; i++) {
          const applicationId = applicationIds[i];
          // Fetch application details
          const applicationDetailsResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/applications/${applicationId}`);
          const applicationDetails = applicationDetailsResponse.data;
          // console.log(applicationDetails)
          // Check if the scholarship ID matches
          if (applicationDetails.scholarship_id === id) {
            applied = true;
            setStatus(applicationDetails.status)
            break; // No need to check further once we find a match
          }
        }
        setHasApplied(applied);
        console.log(applied)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scholarship:', error);
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);
    fetchScholarship();
  }, [id, roleId]);

  useEffect(() => {
    const fetchSimilarScholarships = async () => {
      setSimilarLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships`);
        const filteredScholarships = response.data.filter(item =>
          (item.type === scholarship?.type ||
            item.Place_of_Study === scholarship?.Place_of_Study ||
            item.language_Of_Study === scholarship?.language_Of_Study) &&
          item._id !== scholarship?._id // Exclude the current scholarship
        );
        setSimilarScholarships(filteredScholarships);
      } catch (error) {
        console.error('Error fetching similar scholarships:', error);
      }
      finally {
        setSimilarLoading(false);
      }
    };

    if (scholarship) {
      fetchSimilarScholarships();
    }
  }, [scholarship]);

  const renderField = (label, value) => (
    <p><strong>{label}:</strong> {loading ? <Skeleton width="50%" /> : value}</p>
  );
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 868,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <Navbar />
      {hasApplied && (
        <div
          style={{
            backgroundColor: '#f8d7da', // Light red background
            color: '#721c24', // Red text color
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb', // Border color to match the background
            maxWidth: '1200px',
            margin: 'auto',
            marginTop: '20px'
          }}
        >
          <strong>You have already applied for this scholarship!</strong>
          <p><strong>and your application status is {status}</strong></p>
        </div>
      )}
      <div className="scholarship-detail">
        <div className="scholarship-detail">
          <div className="row-detail">
            <div className="img-container-detail">
              {loading ? (
                <Skeleton variant="rounded" width={500} height={500} />
              ) : (
                <img src={scholarship.scholarship_picture} alt="Scholarship" loading="lazy" />
              )}
            </div>
            <div className="scholarship-info">
              <div className="basic-info">
                {loading ? <Skeleton width="60%" /> : <h1>{scholarship.scholarsip_name}</h1>}
                {renderField("Brief Description", scholarship?.brief_descrition)}
                {renderField("Eligibility Criteria", scholarship?.eligbility_criteria)}
                {renderField("Place of Study", scholarship?.Place_of_Study)}
                {renderField("Type", scholarship?.type)}
                {renderField("Selection Process", scholarship?.SelectionProcess)}
                {renderField("Language of Study", scholarship?.language_Of_Study)}
              </div>
            </div>
          </div>
          <div className="secondary-info" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 45%' }}>
              {renderField("Expenses Covered", `${scholarship?.expenses_coverd}`)}
              {renderField("Number of Seats Available", scholarship?.number_of_seats_available)}
              {renderField("Key Personnel", scholarship?.key_personnel_details)}
              {renderField("Submission Date", new Date(scholarship?.submission_date).toLocaleDateString())}
            </div>

            <div style={{ flex: '1 1 45%' }}>
              <p>
                <strong>Website:</strong>
                {loading ? <Skeleton width="40%" /> : <a href={scholarship.website_link}>Visit our website to Learn More</a>}
              </p>
              {renderField("Terms and Conditions", scholarship?.term_and_conditions)}

              {renderField("Start Date", new Date(scholarship?.start_Date).toLocaleDateString())}
              {renderField("End Date", new Date(scholarship?.End_Date).toLocaleDateString())}
            </div>

            {/* Third div goes under the first two divs */}
            <div style={{ flex: '1 1 100%', textAlign: 'center' }}>
              {loading ? (
                <Skeleton width="30%" height={40} style={{ margin: 'auto' }} />
              ) : (
                renderField("Deadline", moment(scholarship?.deadline).format('DD/MM/YYYY'))
              )}

              {loading ? (
                <Skeleton width="30%" height={80} style={{ margin: 'auto' }} />
              ) : (
                scholarship.number_of_seats_available > 0 && new Date() <= new Date(scholarship.deadline) && !hasApplied ? (
                  <Link to={`/apply-for-scholarship/${scholarship._id}`} className="apply-button">Apply Now</Link>
                ) : (
                  <p className="apply-closed" style={{ margin: 'auto' }}>Applications are closed.</p>
                )
              )}
            </div>
          </div>
        </div>
        <ScholarshipFeedback id={id} status={status} endDate={endDate} />
        {/* Similar scholarships section */}
        {!similarLoading && similarScholarships.length === 0 ? null : (
          <div className="similar-scholarships">
            <h2 className='header-similar'>Similar Scholarships</h2>
            <Slider {...sliderSettings}>
              {similarLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className='similar-scholarship-item'>
                    <Skeleton variant="text" height={40} width="300px" />
                    <Skeleton variant="rounded" width='300px' height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={40} width="270px" />
                      <Skeleton variant="text" height={40} width="250px" />
                      <Skeleton variant="text" height={40} width="280px" />
                      <Skeleton variant="text" height={40} width="300px" />
                      <Skeleton variant="text" height={60} width="50%" style={{margin:'auto'}} />
                    </CardContent>
                  </Card>
                ))
              ) : similarScholarships.map(scholarship => (
                <Card key={scholarship._id} className='similar-scholarship-item'>
                  <h2 height="100px" className='card-header' style={{ color: '#418447' }}>
                    {scholarship.scholarsip_name}
                  </h2>
                  <CardMedia
                    component="img"
                    height="200px"
                    image={scholarship.scholarship_picture}
                    alt={scholarship.scholarsip_name}
                    loading="lazy"
                  />
                  <CardContent height="200px">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <strong>Brief Description: </strong>{scholarship.brief_descrition}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <strong>Place of Study:</strong>  {scholarship.type}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <strong>Language of Study:</strong> {scholarship.language_Of_Study}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <strong>Place of Study:</strong> {scholarship.Place_of_Study}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing height="100px">
                    <Link to={`/scholarship-detail/${scholarship._id}`} className="details-scholarship-link">View Details</Link>
                  </CardActions>

                </Card>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </>
  );
};

export default ScholarshipDetail;
