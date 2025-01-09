import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Pagination, Skeleton, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};
const StudentApplications = () => {
  const { id } = useParams();
  const [scholarshipName, setScholarshipName] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState();
  const [deadline, setDeadline] = useState();
  const [studentData, setStudent] = useState(null);
  const [combinedData, setCombinedData] = useState([]); // New state for combined data

  const viewDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/scholarships/${id}`);
      setScholarshipName(response.data.scholarsip_name);
      setNumberOfSeats(response.data.number_of_seats_available);
      // console.log(response.data.deadline > Date());
      // console.log(response.data.deadline);
      setDeadline(response.data.deadline);
    } catch (error) {
      console.error('Error fetching scholarship details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };
  const fetchApplications = async (id) => {
    try {
      setLoading(true);

      // First API call to get all applied students for a scholarship
      const response = await axios.get(`http://localhost:3000/api/v1/scholarships/${id}/Applied-students`);
      const appliedStudents = response.data;

      // Fetch the student details for each applied student
      const studentDetails = await Promise.all(
        appliedStudents.map((student) =>
          axios.get(`http://localhost:3000/api/v1/getStudentDataFromId/${student.student_id}`)
        )
      );

      // Extract the student data from the responses
      const studentData = studentDetails.map((response) => response.data);

      // Combine the applied students data with their respective student details
      const combinedData = appliedStudents.map((application, index) => ({
        application,
        student: studentData[index],
      }));

      // Set the combined data in the state
      setCombinedData(combinedData);

      // Filter applications by status
      setAcceptedApplications(combinedData.filter((item) => item.application.status === "accept"));
      setPendingApplications(combinedData.filter((item) => item.application.status === "pending"));
      setRejectedApplications(combinedData.filter((item) => item.application.status === "reject"));

      console.log("Combined Data:", combinedData);
      console.log("Accepted Applications:", acceptedApplications);
    } catch (error) {
      console.error("Error fetching applications and student data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications(id);
    if (id) {
      viewDetails(id);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  const getStatusClass = (status) => {
    switch (status) {
      case 'accept':
        return 'text-success bg-success-light';
      case 'pending':
        return 'text-warning bg-warning-light';
      case 'reject':
        return 'text-danger bg-danger-light';
      default:
        return '';
    }
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1);

  };
  const getTabFilteredApplications = () => {
    if (tabValue === 0) return acceptedApplications;
    if (tabValue === 1) return pendingApplications;
    if (tabValue === 2) return rejectedApplications;
    return [];
  };
  const tabFilteredApplications = getTabFilteredApplications();
  const paginatedApplications = tabFilteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <PageContainer
      breadcrumbs={<Typography>Dashboard / Scholarships / Applications</Typography>}
    >
      <h2>Student Applications</h2>
      <div className="applications-container">
        {loadingDetails ? (
          <>
            <div className="scholarship-details">
              <Skeleton variant="text" width="45%" height="50px" />
              <Skeleton variant="text" width="20%" height="30px" />
              <Skeleton variant="text" width="20%" height="30px" /></div>
          </>
        ) : (
          <div className='studentApp'>
            <h3 className="scholarship-name">{scholarshipName}</h3>
            <div className="scholarship-details">
              <p className="available-seats accepted-applicants">
                <span className="details-bold">Available Seats:</span> {numberOfSeats}
              </p>
              {loading ? (
                <div style={{display:'flex',gap:'30px'}}>
                  <Skeleton variant="text" width="234px" height="60px" />
                  <Skeleton variant="text" width="234px" height="60px" /></div>
              ) : (
                <>
                  <p className="accepted-applicants">
                    <span className="details-bold">Accepted Applicants:</span> {acceptedApplications.length}
                  </p>
                  <p className="accepted-applicants">
                    <span className="details-bold">Deadline:</span> {moment(deadline).format("DD/MM/YYYY")}
                  </p></>
              )}
            </div>
          </div>
        )}
      </div>
      <Box sx={{ width: '100%', marginBottom: '25px' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Scholarship Status">
          <Tab label="Accepted" />
          <Tab label="Pending" />
          <Tab label="Rejected" />
        </Tabs>
      </Box>
      <div className="table-container student-application ps-3">
        {loading ? (
          <table className="table table-hover bg-transparent">
            <thead>
              <tr className="bg-transparent">
                <th scope="col">#</th>
                <th scope="col">Applicant's Name</th>
                <th scope="col" className="sortable-column d-none d-md-table-cell">Major / Field of Study</th>
                <th scope="col" className="sortable-column">GPA </th>
                <th scope="col" className="sortable-column d-none d-md-table-cell">Application Date</th>
                <th scope="col" className="d-none d-md-table-cell">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <tr key={index}>
                  <th scope="row"><Skeleton variant="text" width={20} /></th>
                  <td><Skeleton variant="text" width="30%" /></td>
                  <td><Skeleton variant="text" width="20%" /></td>
                  <td><Skeleton variant="text" width="20%" /></td>
                  <td><Skeleton variant="text" width="20%" /></td>
                  <td className="d-none d-md-table-cell"><Skeleton variant="text" width="80%" /></td>
                  <td><Skeleton variant="rectangular" width={50} height={20} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <table className="table table-hover bg-transparent">
              <thead>
                <tr className="bg-transparent">
                  <th scope="col">#</th>
                  <th scope="col">Applicant's Name</th>
                  <th scope="col" className="d-none d-md-table-cell">Major / Stream</th>
                  <th scope="col">GPA</th>
                  <th scope="col" className="d-none d-md-table-cell" >Application Date</th>
                  <th scope="col" className="d-none d-md-table-cell">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApplications.length ? (
                  paginatedApplications.map((item, index) => (
                    <React.Fragment key={item._id}>
                      <tr onClick={() => handleExpandRow(index)}>
                        <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                        <td>{item.student.fullname}</td>
                        <td className={`d-none d-md-table-cell`}>{item.application.major || item.application.stream} </td>
                        <td>{item.application.GPA}</td>
                        <td className={`d-none d-md-table-cell`}>{moment(item.application.submitDate).format('YYYY-MM-DD HH:mm')}</td>
                        <td className={`d-none d-md-table-cell`}>
                          <span className={`status ${getStatusClass(item.application.status)}`}>{item.application.status}</span>
                        </td>
                        <td className="action d-none d-md-table-cell">
                          <div className='eyeIcon'>
                            <ul className="wishlist-menu">
                              <li>
                                <div>
                                  {/* {console.log(numberOfSeats)} */}
                                  <Link
                                    to={`/advertiserDashboard/applications/${id}/details/${item.application._id}`}
                                    state={{ acceptedCount: acceptedApplications.length, seatsAvailable: numberOfSeats, deadline: deadline }}
                                    className="details-scholarship-link"
                                  >
                                    <button title="view the application">
                                      <FontAwesomeIcon icon={faEye} />
                                    </button>
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </td>
                        {isSmallScreen && (
                          <td>
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className={`expand-icon ${expandedRow === index ? 'expanded' : ''}`}
                            />
                          </td>
                        )}
                      </tr>
                      {expandedRow === index && isSmallScreen && (
                        <tr className="expanded-row expanded-row-content">
                          <td colSpan="4" className="full-width-expanded ">
                            <div><strong>Major:</strong> {item.major}</div>
                            <div><strong>Application Date:</strong> {item.submitDate}</div>
                            <div className={`left ${getStatusClass(item.status)}`}><strong>Status:</strong> {item.status}</div>
                            <div className="dropdown d-md-none drop-down-buttons ">
                              <ul className=' expanded'>
                                <div>
                                  <li>
                                    <Link
                                      to={`/advertiserDashboard/applications/${id}/details/${item.application._id}`}
                                      state={{ acceptedCount: acceptedApplications.length, seatsAvailable: numberOfSeats, deadline: deadline }}
                                      className="details-scholarship-link "
                                    >
                                      <button title="view the application" className="dropdown-item">
                                        <FontAwesomeIcon icon={faEye} className="px-1" />
                                        view details
                                      </button>
                                    </Link>
                                  </li>
                                </div>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No Applications</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(tabFilteredApplications.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className="pagination-search"
              size="large"
            />
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default StudentApplications;
