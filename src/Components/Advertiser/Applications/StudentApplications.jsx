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
  // const sampleData = [
  //   {
  //     _id: "1",
  //     fullName: "John Smith",
  //     dob: "2001-05-15",
  //     major: "Computer Science",
  //     GPA: 3.9,
  //     submitDate: "2024-12-01",
  //     status: "pending"
  //   },
  //   {
  //     _id: "2",
  //     fullName: "Sarah Johnson",
  //     dob: "2002-08-20",
  //     major: "Mechanical Engineering",
  //     GPA: 3.7,
  //     submitDate: "2024-12-02",
  //     status: "accept"
  //   },
  //   {
  //     _id: "3",
  //     fullName: "Ahmed Ali",
  //     dob: "2000-11-05",
  //     major: "Business Administration",
  //     GPA: 3.6,
  //     submitDate: "2024-12-03",
  //     status: "reject"
  //   },
  //   {
  //     _id: "4",
  //     fullName: "Maria Gonzalez",
  //     dob: "2003-03-18",
  //     major: "Biomedical Engineering",
  //     GPA: 3.8,
  //     submitDate: "2024-12-04",
  //     status: "pending"
  //   },
  //   {
  //     _id: "5",
  //     fullName: "Kevin Zhang",
  //     dob: "1999-07-10",
  //     major: "Electrical Engineering",
  //     GPA: 3.5,
  //     submitDate: "2024-12-01",
  //     status: "accepted"
  //   },
  //   {
  //     _id: "6",
  //     fullName: "Emily Davis",
  //     dob: "2001-12-25",
  //     major: "Data Science",
  //     GPA: 4.0,
  //     submitDate: "2024-12-02",
  //     status: "pending"
  //   },
  //   {
  //     _id: "7",
  //     fullName: "Omar Hassan",
  //     dob: "2002-09-09",
  //     major: "Civil Engineering",
  //     GPA: 3.4,
  //     submitDate: "2024-12-03",
  //     status: "reject"
  //   },
  //   {
  //     _id: "8",
  //     fullName: "Anna Ivanova",
  //     dob: "2000-02-14",
  //     major: "Environmental Science",
  //     GPA: 3.9,
  //     submitDate: "2024-12-04",
  //     status: "pending"
  //   },
  //   {
  //     _id: "9",
  //     fullName: "Hiroshi Tanaka",
  //     dob: "1998-11-23",
  //     major: "Software Engineering",
  //     GPA: 3.8,
  //     submitDate: "2024-12-05",
  //     status: "accept"
  //   },
  //   {
  //     _id: "10",
  //     fullName: "Fatima Rahman",
  //     dob: "2001-06-30",
  //     major: "Biotechnology",
  //     GPA: 3.7,
  //     submitDate: "2024-12-06",
  //     status: "pending"
  //   },
  //   {
  //     _id: "11",
  //     fullName: "Michael Brown",
  //     dob: "2000-01-10",
  //     major: "Finance",
  //     GPA: 3.5,
  //     submitDate: "2024-12-07",
  //     status: "reject"
  //   },
  //   {
  //     _id: "12",
  //     fullName: "Sophia Patel",
  //     dob: "2003-04-18",
  //     major: "Chemistry",
  //     GPA: 3.9,
  //     submitDate: "2024-12-08",
  //     status: "pending"
  //   },
  //   {
  //     _id: "13",
  //     fullName: "Diego Morales",
  //     dob: "1997-08-05",
  //     major: "Civil Engineering",
  //     GPA: 3.6,
  //     submitDate: "2024-12-09",
  //     status: "accepted"
  //   },
  //   {
  //     _id: "14",
  //     fullName: "Laura Adams",
  //     dob: "2002-10-12",
  //     major: "Political Science",
  //     GPA: 3.8,
  //     submitDate: "2024-12-10",
  //     status: "pending"
  //   },
  //   {
  //     _id: "15",
  //     fullName: "Ali Khan",
  //     dob: "1999-02-02",
  //     major: "Architecture",
  //     GPA: 3.7,
  //     submitDate: "2024-12-11",
  //     status: "reject"
  //   },
  //   {
  //     _id: "16",
  //     fullName: "Chloe Martinez",
  //     dob: "2001-03-27",
  //     major: "Mathematics",
  //     GPA: 4.0,
  //     submitDate: "2024-12-12",
  //     status: "accept"
  //   },
  //   {
  //     _id: "17",
  //     fullName: "William Carter",
  //     dob: "2000-07-21",
  //     major: "Physics",
  //     GPA: 3.5,
  //     submitDate: "2024-12-13",
  //     status: "pending"
  //   },
  //   {
  //     _id: "18",
  //     fullName: "Amara Okafor",
  //     dob: "2002-05-30",
  //     major: "Environmental Science",
  //     GPA: 3.6,
  //     submitDate: "2024-12-14",
  //     status: "pending"
  //   },
  //   {
  //     _id: "19",
  //     fullName: "Yuki Nakamura",
  //     dob: "2000-12-01",
  //     major: "Computer Engineering",
  //     GPA: 3.8,
  //     submitDate: "2024-12-15",
  //     status: "accept"
  //   },
  //   {
  //     _id: "20",
  //     fullName: "Emma Watson",
  //     dob: "2003-09-15",
  //     major: "Medicine",
  //     GPA: 3.9,
  //     submitDate: "2024-12-16",
  //     status: "pending"
  //   }
  // ];
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
  const [studentData, setStudent] = useState(null);
  const [combinedData, setCombinedData] = useState([]); // New state for combined data

  const viewDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/scholarships/${id}`);
      setScholarshipName(response.data.scholarsip_name);
      setNumberOfSeats(response.data.number_of_seats_available);
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
                    <Skeleton variant="text" width="45%" height="50px" />
                    <Skeleton variant="text" width="20%" height="30px" />
                    <Skeleton variant="text" width="20%" height="30px" />
                </>
            ) : (
                <div>
                    <h3 className="scholarship-name">{scholarshipName}</h3>
                    <div className="scholarship-details">
                        <p className="available-seats">
                            <span className="details-bold">Available Seats:</span> {numberOfSeats}
                        </p>
                        {loading ? (
                            <Skeleton variant="text" width="20%" height="30px" />
                        ) : (
                            <p className="accepted-applicants">
                                <span className="details-bold">Accepted Applicants:</span> {acceptedApplications.length}
                            </p>
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
                        <td className={`d-none d-md-table-cell`}>{item.application.major ||item.application.stream } </td>
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
                                  <Link to={`/advertiserDashboard/applications/${id}/details/${item.application._id}`} className="details-scholarship-link">
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
                                    <Link to={`/scholarship-detail/${item._id}`} className="details-scholarship-link">
                                      <button title="view details" className="dropdown-item">
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
