import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Skeleton, useMediaQuery, Tabs, Tab, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../Student/studentDash.css';
import { UserContext } from "../../../Context/UserContext";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 5;
  const [tabValue, setTabValue] = useState(0);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  let { userToken, roleId } = useContext(UserContext);
  const [combinedData, setCombinedData] = useState([]); // New state for combined data

  const fetchApplicatins = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/${roleId}/applications`);
      const applicationIds = response.data;
      if (!Array.isArray(applicationIds) || applicationIds.length === 0) {
        console.log('No applications found for this student.');
        setCombinedData([]); // Set an empty array if no applications are found
        setLoading(false);
        return; // Exit early since there's no data to process
      }
      const applicationDetails = await Promise.all(
        applicationIds.map((applicationId) =>
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/applications/${applicationId}`)
        )
      );

      const applicationData = applicationDetails.map((response) => response.data);

      // Fetch the scholarship details for each application
      const scholarshipDetails = await Promise.all(
        applicationDetails.map((appResponse) => {
          const scholarshipId = appResponse.data.scholarship_id;
          return axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${scholarshipId}`);
        })
      );

      const scholarshipData = scholarshipDetails.map((scholarshipResponse) => scholarshipResponse.data);

      // Combine the application data and scholarship data
      const combinedData = applicationDetails.map((appResponse, index) => ({
        application: appResponse.data,
        scholarship: scholarshipData[index],
      }));
      setCombinedData(combinedData);


      // console.log("Filtered accepted applications: ", combinedData.filter(item => item.scholarship.approval_status === "accept"));
      // combinedData.forEach(item => {
      //   console.log(item.scholarship.approval_status);  // Check if the value is 'accept'
      // });


      {/* i will chang this according to item.application.status */ }
      setAcceptedApplications(combinedData.filter(item => item.application.status === "accept"));
      setPendingApplications(combinedData.filter(item => item.application.status=== "pending"));
      setRejectedApplications(combinedData.filter(item => item.application.status === "reject"));

      // console.log(combinedData);
      // console.log(acceptedApplications);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApplicatins();
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const isSmallScreen = useMediaQuery('(max-width:768px)');

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
    <div className="student-admin wishlist-table">
      <div className="mb-2 justify-content-between pb-3">
        <h1 className="ps-4 main-col mb-4">Applications</h1>
      </div>
      <Box sx={{ width: '100%', marginBottom: '25px' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Scholarship Status">
          <Tab label="Accepted" />
          <Tab label="Pending" />
          <Tab label="Rejected" />
        </Tabs>
      </Box>
      <div className="table-container ps-3">
        {loading ? (
          <table className="table table-hover bg-transparent">
            <thead>
              <tr className="bg-transparent">
                <th scope="col">#</th>
                <th scope="col">Scholarship Image</th>
                <th scope="col" className="sortable-column">Scholarship Name</th>
                <th scope="col" className="d-none d-md-table-cell">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <tr key={index}>
                  <th scope="row"><Skeleton variant="text" width="100%" /></th>
                  <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Skeleton variant="circular" width="60px" height="60px" />
                  </td>
                  <td><Skeleton variant="text" width="80%" /></td>
                  <td className="d-none d-md-table-cell"><Skeleton variant="text" width="100%" /></td>
                  <td><Skeleton variant="rectangular" width="30%" height={20} /></td>
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
                  <th scope="col">Scholarship Image</th>
                  <th scope="col">
                    Scholarship Name
                  </th>
                  <th scope="col" className="d-none d-md-table-cell">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApplications.length ? (
                  paginatedApplications.map((item, index) => (
                    <React.Fragment key={item.application._id}>
                      <tr onClick={() => handleExpandRow(index)}>
                        <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                        <td><img src={item.scholarship.scholarship_picture} alt="Scholarship" style={{ width: '60px', height: '60px', borderRadius: '50%' }} loading="lazy" /></td>
                        <td>{item.scholarship.scholarsip_name}</td>
                        <td className={`d-none d-md-table-cell`}>
                          <span className={`status ${getStatusClass(item.application.status)}`}>{item.application.status}</span>
                        </td>
                        <td className="action d-none d-md-table-cell">
                          <div>
                            <ul className="wishlist-menu">
                              <li>
                                <div>
                                  <Link to={`/scholarship-detail/${item.scholarship._id}`} className="details-scholarship-link">
                                    <button title="view details" className="mt-15px">
                                      <FontAwesomeIcon icon={faEye} />
                                    </button>
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`expand-icon ${expandedRow === index ? 'expanded' : ''}`}
                          />
                        </td>
                      </tr>
                      {expandedRow === index && isSmallScreen && (
                        <tr className="expanded-row expanded-row-content">
                          <td colSpan="4" className="full-width-expanded ">
                            {/* i will chang this according to item.application.status */}

                            <div className={`left ${getStatusClass(item.application.status)}`}><strong>Status:</strong> {item.scholarship.approval_status}</div>
                            <div className="dropdown d-md-none drop-down-buttons ">
                              <ul className=' expanded'>
                                <div>
                                  <li>
                                    <Link to={`/scholarship-detail/${item.scholarship._id}`} className="details-scholarship-link">
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
    </div>
  );
}

export default Applications;
