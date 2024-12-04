import React, { useContext, useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisVertical, faUserXmark, faXmark, faSortUp, faSortDown, faChevronDown, faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../Context/UserContext';
import { PieChart } from '@mui/x-charts';
import { Box, Modal, Pagination, Skeleton, Typography, useMediaQuery } from '@mui/material'; // Import Skeleton
import './Scholarships.css'
import moment from 'moment';

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};
//style for the modal when view the details of a scholarship
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Enable vertical scrolling
  borderRadius: '8px',
};
export default function Scholarships() {
  const { userToken } = useContext(UserContext);
  const [scholarships, setScholarships] = useState([]);
  const [pendingScholarships, setPendingScholarships] = useState([]);
  const [rejectedScholarships, setRejectedScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [organizationNames, setOrganizationNames] = useState({});
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [currentPageS, setCurrentPageS] = useState(1);
  const [currentPageP, setCurrentPageP] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedRowP, setExpandedRowP] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermP, setSearchTermP] = useState('');

  // Fetch all scholarships
  const getOrganizationName = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/advertisers/${id}`);
      return data.organization_name;
    } catch (error) {
      console.error("Error fetching organization name:", error);
      return 'Unknown Organization';
    }
  };

  const fetchScholarships = async () => {
    setLoading(true);

    try {
      const [acceptedRes, pendingRes, rejectedRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/v1/scholarships`),
        axios.get(`http://localhost:3000/api/v1/admin/scholarhips/pending`),
        axios.get(`http://localhost:3000/api/v1/admin/scholarhips/reject`),
      ]);

      const acceptedScholarships = acceptedRes.data;
      const pendingScholarships = pendingRes.data;
      const rejectedScholarships = rejectedRes.data;

      const allScholarships = [...acceptedScholarships, ...pendingScholarships, ...rejectedScholarships];

      // Fetch all organization names in parallel for all scholarships
      const organizationNameMap = {};
      await Promise.all(
        allScholarships.map(async (scholarship) => {
          const organizationName = await getOrganizationName(scholarship.advertiser_id);
          organizationNameMap[scholarship._id] = organizationName;
        })
      );

      setScholarships(acceptedScholarships);
      setPendingScholarships(pendingScholarships);
      setRejectedScholarships(rejectedScholarships);
      setOrganizationNames(organizationNameMap);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch scholarships and organization names on mount
  useEffect(() => {
    fetchScholarships();
  }, []);

  const deleteScholarship = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/v1/scholarships/${id}`, {
            headers: {
              Authorization: `Bearer ${userToken}`, // Include Bearer token in headers
            },
          });
          setScholarships((prevScholarships) =>
            prevScholarships.filter((scholarship) => scholarship._id !== id) // Use _id for deletion
          );
          Swal.fire({
            title: "Deleted!",
            text: "Scholarship has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting scholarship:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the scholarship.",
            icon: "error",
          });
        }
      }
    });
  };
  const handleAccept = async (id) => {
    try {
      const { data: acceptedScholarship } = await axios.patch(
        `http://localhost:3000/api/v1/admin/scholarships/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      Swal.fire('Accepted!', 'The scholarship has been accepted.', 'success');
      fetchScholarships();

    } catch (error) {
      console.error('Error accepting scholarship:', error);
      Swal.fire('Error!', 'There was a problem accepting the scholarship.', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/admin/scholarships/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      Swal.fire('Rejected!', 'The scholarship has been rejected.', 'success');
      fetchScholarships();

    } catch (error) {
      console.error('Error rejecting scholarship:', error);
      Swal.fire('Error!', 'There was a problem rejecting the scholarship.', 'error');
    }
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };
  const filteredScholarships = scholarships.filter((scholarship) => {
    return (
      scholarship.scholarsip_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const sortedScholarshipsS = [...filteredScholarships].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = sortByKey(a, sortConfig.key);
      const bValue = sortByKey(b, sortConfig.key);
      const order = sortConfig.direction === 'ascending' ? 1 : -1;
      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });
  const handleSearchP = (event) => {
    setSearchTermP(event.target.value);
    setCurrentPageP(1);
  };
  const handleSearchS = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPageS(1);
  };
  const filteredScholarshipsP = pendingScholarships.filter((scholarship) => {
    return (
      scholarship.scholarsip_name.toLowerCase().includes(searchTermP.toLowerCase())
    );
  });
  const sortedScholarshipsP = [...filteredScholarshipsP].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = sortByKey(a, sortConfig.key);
      const bValue = sortByKey(b, sortConfig.key);
      const order = sortConfig.direction === 'ascending' ? 1 : -1;
      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });
  const handleChangePageS = (event, newPage) => {
    setCurrentPageS(newPage);
  };
  const handleChangePageP = (event, newPage) => {
    setCurrentPageP(newPage);
  };
  const paginatedScholarshipsS = sortedScholarshipsS.slice(
    (currentPageS - 1) * itemsPerPage,
    currentPageS * itemsPerPage
  );
  const paginatedScholarshipsP = sortedScholarshipsP.slice(
    (currentPageP - 1) * itemsPerPage,
    currentPageP * itemsPerPage
  );
  const renderSortIcon = (columnKey) => {
    const isActive = sortConfig.key === columnKey;
    const icon = sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    return (
      <FontAwesomeIcon
        icon={icon}
        className={`sort-icon ${isActive ? 'active' : ''}`}
      />
    );
  };
  const handleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  const handleExpandRowP = (index) => {
    setExpandedRowP(expandedRowP === index ? null : index);
  };
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const [open, setOpen] = useState(false);
  const [scholarshipDetails, setScholarshipDetails] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const viewDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/scholarships/${id}`);
      setScholarshipDetails(response.data);
      // console.log(response.data);
      handleOpen();
      setLoadingDetails(false)
    } catch (error) {
      console.error('Error fetching scholarship details:', error);
      setLoadingDetails(false);
    }
  };
  const viewDetailsP = async (id) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/admin/scholarships/pending/${id}`);
      setScholarshipDetails(response.data);
      console.log(response.data);
      handleOpen();
      setLoadingDetails(false)
    } catch (error) {
      console.error('Error fetching scholarship details:', error);
      setLoadingDetails(false);
    }
  };

  return (
    <>
      <div className="scholarships-admin">
        <div className="mb-2 justify-content-between pb-3">
          <h1 className="ps-4 main-col">Scholarships</h1>
          <form className="me-3 search-admin" role="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#418447" }} />
            <input
              className="form-control me-5"
              type="search"
              placeholder="Search by Name"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchS}
              colSize="col-md-5"
            />
          </form>
        </div>
        <div className="table-container">
          {loading ? (
            <table className="table table-hover bg-transparent">
              <thead>
                <tr className="bg-transparent">
                  <th scope="col">#</th>
                  <th scope="col">Scholarship Name</th>
                  <th scope="col" className='d-none d-md-table-cell'>Organization Name</th>
                  <th scope="col" className='d-none d-md-table-cell'>Submission Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <tr key={index}>
                    <th scope="row"><Skeleton variant="text" width={20} /></th>
                    <td><Skeleton variant="text" width="80%" /></td>
                    <td className='d-none d-md-table-cell'><Skeleton variant="text" width="80%" /></td>
                    <td className='d-none d-md-table-cell'><Skeleton variant="text" width="80%" /></td>
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
                    <th scope="col" onClick={() => handleSort('scholarsip_name')} className="sortable-column">Scholarship Name {renderSortIcon('scholarsip_name')}</th>
                    <th scope="col" className='d-none d-md-table-cell' >Organization Name </th>
                    <th scope="col" onClick={() => handleSort('submission_date')} className="sortable-column d-none d-md-table-cell">Submission Date {renderSortIcon('submission_date')}</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedScholarshipsS.length ? (
                    paginatedScholarshipsS.map((scholarship, index) => (
                      <React.Fragment key={scholarship._id}>
                        <tr onClick={() => handleExpandRow(index)}>
                          <th scope="row">{(currentPageS - 1) * itemsPerPage + index + 1}</th>
                          <td>{scholarship.scholarsip_name}</td>
                          <td className="d-none d-md-table-cell">
                            {organizationNames[scholarship._id] ? (
                              organizationNames[scholarship._id]
                            ) : (
                              <Skeleton width="100px" />
                            )}
                          </td>
                          <td className="d-none d-md-table-cell">
                            {moment.utc(scholarship.submission_date).format('YYYY-MM-DD')}
                          </td>
                          <td className="action d-none d-md-table-cell">
                            <div className="dropdown">
                              <button
                                className="border-0 bg-transparent dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                              </button>
                              <ul className="dropdown-menu">
                                <li className="d-flex align-items-center">
                                  <div>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => viewDetails(scholarship._id)}
                                    >
                                      <FontAwesomeIcon icon={faEye} className="px-1" />
                                      View
                                    </button>
                                    <Modal
                                      keepMounted
                                      open={open}
                                      onClose={handleClose}
                                      aria-labelledby="scholarship-details-title"
                                      aria-describedby="scholarship-details-description"
                                    >
                                      <Box sx={style}>
                                        <Typography id="scholarship-details-title" variant="h6" component="h2">
                                          <strong>Scholarship Details</strong>
                                        </Typography>
                                        {loadingDetails ? (
                                          <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                                            <Skeleton variant="rectangular" height={200} sx={{ my: 2, borderRadius: '8px' }} />
                                            <Skeleton variant="text" width="60%" />
                                            <Skeleton variant="text" width="80%" />
                                            <Skeleton variant="text" width="50%" />
                                            <Skeleton variant="text" width="90%" />
                                            <Skeleton variant="text" width="70%" />
                                          </Box>
                                        ) : (
                                          scholarshipDetails && (
                                            <Box id="scholarship-details-description" sx={{ mt: 2 }}>
                                              <Box sx={{ my: 2 }}>
                                                <img src={scholarshipDetails.scholarship_picture} alt="Scholarship" style={{ width: '100%', borderRadius: '8px' }} />
                                              </Box>
                                              <Typography><strong>Name:</strong> {scholarshipDetails.scholarsip_name}</Typography>
                                              <Typography><strong>Brief Description:</strong> {scholarshipDetails.brief_descrition}</Typography>
                                              <Typography><strong>Type:</strong> {scholarshipDetails.type}</Typography>
                                              <Typography><strong>Eligibility Criteria:</strong> {scholarshipDetails.eligbility_criteria}</Typography>
                                              <Typography><strong>Selection Process:</strong> {scholarshipDetails.SelectionProcess}</Typography>
                                              <Typography><strong>Language of Study:</strong> {scholarshipDetails.language_Of_Study}</Typography>
                                              <Typography><strong>Place of Study:</strong> {scholarshipDetails.Place_of_Study}</Typography>
                                              <Typography><strong>Start Date:</strong>{moment.utc(scholarshipDetails.start_Date).format('YYYY-MM-DD')} </Typography>
                                              <Typography><strong>End Date:</strong> {moment.utc(scholarshipDetails.End_Date).format('YYYY-MM-DD')}</Typography>
                                              <Typography><strong>Submission Deadline:</strong>{moment.utc(scholarshipDetails.submission_date).format('YYYY-MM-DD')}</Typography>
                                              <Typography><strong>Number of Seats Available:</strong> {scholarshipDetails.number_of_seats_available}</Typography>
                                              <Typography><strong>Expenses Covered:</strong> ${scholarshipDetails.expenses_coverd}</Typography>
                                              <Typography><strong>Terms and Conditions:</strong> {scholarshipDetails.term_and_conditions}</Typography>
                                              <Typography><strong>Key Personnel Details:</strong> {scholarshipDetails.key_personnel_details}</Typography>
                                              <Typography><strong>Approval Status:</strong> {scholarshipDetails.approval_status}</Typography>
                                              <Typography><strong>Website:</strong> <a href={scholarshipDetails.website_link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.website_link}</a></Typography>
                                              <Typography><strong>Application Form:</strong> <a href={scholarshipDetails.form_Link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.form_Link}</a></Typography>
                                            </Box>
                                          )
                                        )}
                                      </Box>
                                    </Modal>
                                  </div>
                                </li>
                                <li className="d-flex justify-content-center align-items-center">
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => deleteScholarship(scholarship._id)}
                                  >
                                    <FontAwesomeIcon icon={faUserXmark} className="px-1" />
                                    Delete
                                  </button>
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
                            <td colSpan="4" className="full-width-expanded">
                              <div><strong>Organization Name:</strong>
                                {organizationNames[scholarship._id] ? (
                                  organizationNames[scholarship._id]
                                ) : (
                                  <Skeleton width="100px" />
                                )}
                              </div>
                              <div><strong>Submission Date:</strong>
                                {moment.utc(scholarship.submission_date).format('YYYY-MM-DD')}
                              </div>
                              <div className="dropdown d-md-none drop-down-buttons">
                                <ul className='expanded-delete'>
                                  <li className="d-flex align-items-center">
                                    <div>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => viewDetails(scholarship._id)}
                                      >
                                        <FontAwesomeIcon icon={faEye} className="px-1" />
                                        View
                                      </button>
                                      <Modal
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="scholarship-details-title"
                                        aria-describedby="scholarship-details-description"
                                      >
                                        <Box sx={style}>
                                          <Typography id="scholarship-details-title" variant="h6" component="h2">
                                            <strong>Scholarship Details</strong>
                                          </Typography>
                                          {loadingDetails ? (
                                            <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                                              <Skeleton variant="rectangular" height={200} sx={{ my: 2, borderRadius: '8px' }} />
                                              <Skeleton variant="text" width="60%" />
                                              <Skeleton variant="text" width="80%" />
                                              <Skeleton variant="text" width="50%" />
                                              <Skeleton variant="text" width="90%" />
                                              <Skeleton variant="text" width="70%" />
                                            </Box>
                                          ) : (
                                            scholarshipDetails && (
                                              <Box id="scholarship-details-description" sx={{ mt: 2 }}>
                                                <Box sx={{ my: 2 }}>
                                                  <img src={scholarshipDetails.scholarship_picture} alt="Scholarship" style={{ width: '100%', borderRadius: '8px' }} />
                                                </Box>
                                                <Typography><strong>Name:</strong> {scholarshipDetails.scholarsip_name}</Typography>
                                                <Typography><strong>Brief Description:</strong> {scholarshipDetails.brief_descrition}</Typography>
                                                <Typography><strong>Type:</strong> {scholarshipDetails.type}</Typography>
                                                <Typography><strong>Eligibility Criteria:</strong> {scholarshipDetails.eligbility_criteria}</Typography>
                                                <Typography><strong>Selection Process:</strong> {scholarshipDetails.SelectionProcess}</Typography>
                                                <Typography><strong>Language of Study:</strong> {scholarshipDetails.language_Of_Study}</Typography>
                                                <Typography><strong>Place of Study:</strong> {scholarshipDetails.Place_of_Study}</Typography>
                                                <Typography><strong>Start Date:</strong>{moment.utc(scholarshipDetails.start_Date).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>End Date:</strong>{moment.utc(scholarshipDetails.End_Date).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>Submission Deadline:</strong>{moment.utc(scholarshipDetails.submission_date).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>Number of Seats Available:</strong> {scholarshipDetails.number_of_seats_available}</Typography>
                                                <Typography><strong>Expenses Covered:</strong> ${scholarshipDetails.expenses_coverd}</Typography>
                                                <Typography><strong>Terms and Conditions:</strong> {scholarshipDetails.term_and_conditions}</Typography>
                                                <Typography><strong>Key Personnel Details:</strong> {scholarshipDetails.key_personnel_details}</Typography>
                                                <Typography><strong>Approval Status:</strong> {scholarshipDetails.approval_status}</Typography>
                                                <Typography><strong>Website:</strong> <a href={scholarshipDetails.website_link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.website_link}</a></Typography>
                                                <Typography><strong>Application Form:</strong> <a href={scholarshipDetails.form_Link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.form_Link}</a></Typography>
                                              </Box>
                                            )
                                          )}
                                        </Box>
                                      </Modal>
                                    </div>
                                  </li>
                                  <li>
                                    <button className="dropdown-item text-danger" onClick={() => deleteStudent(student._id)}>
                                      <FontAwesomeIcon icon={faUserXmark} className="px-1" />
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No Scholarships</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                count={Math.ceil(filteredScholarships.length / itemsPerPage)}
                page={currentPageS}
                onChange={handleChangePageS}
                className='pagination-search'
                size="large"
              />
            </>
          )}
        </div>
        {/* <pendingScholarships /> */}
        <div className="mb-2 justify-content-between pb-3">
          <h1 className="ps-4 main-col">Pending Scholarships</h1>
          <form className="me-3 search-admin" role="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#418447" }} />
            <input
              className="form-control me-5"
              type="search"
              placeholder="Search by Name"
              aria-label="Search"
              value={searchTermP}
              onChange={handleSearchP}
              colSize="col-md-5"
            />
          </form>
        </div>
          <div className="table-container ps-3">
            {loading ? (
              <table className="table table-hover bg-transparent">
                <thead>
                  <tr className="bg-transparent">
                    <th scope="col">#</th>
                    <th scope="col">Scholarship Name</th>
                    <th scope="col" className="d-none d-md-table-cell" >Organization Name</th>
                    <th scope="col" className="sortable-column d-none d-md-table-cell">Submission Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index}>
                      <th scope="row"><Skeleton variant="text" width={20} /></th>
                      <td><Skeleton variant="text" width="80%" /></td>
                      <td className="d-none d-md-table-cell"><Skeleton variant="text" width="80%" /></td>
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
                      <th scope="col" onClick={() => handleSort('scholarsip_name')} className="sortable-column">Scholarship Name {renderSortIcon('scholarsip_name')}</th>
                      <th scope="col" className=" d-none d-md-table-cell">Organization Name </th>
                      <th scope="col" onClick={() => handleSort('submission_date')} className="sortable-column d-none d-md-table-cell">Submission Date {renderSortIcon('submission_date')}</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedScholarshipsP.length ? (
                      paginatedScholarshipsP.map((scholarship, index) => (
                        <React.Fragment key={scholarship._id}>
                          <tr onClick={() => handleExpandRowP(index)}>
                            <th scope="row">{(currentPageP - 1) * itemsPerPage + index + 1}</th>
                            <td>{scholarship.scholarsip_name}</td>
                            <td className="d-none d-md-table-cell">
                              {organizationNames[scholarship._id] ? (
                                organizationNames[scholarship._id]
                              ) : (
                                <Skeleton width="100px" />
                              )}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {moment.utc(scholarship.submission_date).format('YYYY-MM-DD')}
                            </td>
                            <td className="action d-none d-md-table-cell">
                              <div className="dropdown">
                                <button
                                  className="border-0 bg-transparent dropdown-toggle"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                                <ul className="dropdown-menu">
                                  <li className="d-flex align-items-center">
                                    <div>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => viewDetailsP(scholarship._id)}
                                      >
                                        <FontAwesomeIcon icon={faEye} className="px-1" />
                                        View
                                      </button>
                                      <Modal
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="scholarship-details-title"
                                        aria-describedby="scholarship-details-description"
                                      >
                                        <Box sx={style}>
                                          <Typography id="scholarship-details-title" variant="h6" component="h2">
                                            <strong>Scholarship Details</strong>
                                          </Typography>
                                          {loadingDetails ? (
                                            <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                                              <Skeleton variant="rectangular" height={200} sx={{ my: 2, borderRadius: '8px' }} />
                                              <Skeleton variant="text" width="60%" />
                                              <Skeleton variant="text" width="80%" />
                                              <Skeleton variant="text" width="50%" />
                                              <Skeleton variant="text" width="90%" />
                                              <Skeleton variant="text" width="70%" />
                                            </Box>
                                          ) : (
                                            scholarshipDetails && (
                                              <Box id="scholarship-details-description" sx={{ mt: 2 }}>
                                                <Box sx={{ my: 2 }}>
                                                  <img src={scholarshipDetails.scholarship_picture} alt="Scholarship" style={{ width: '100%', borderRadius: '8px' }} />
                                                </Box>
                                                <Typography><strong>Name:</strong> {scholarshipDetails.scholarsip_name}</Typography>
                                                <Typography><strong>Brief Description:</strong> {scholarshipDetails.brief_descrition}</Typography>
                                                <Typography><strong>Type:</strong> {scholarshipDetails.type}</Typography>
                                                <Typography><strong>Eligibility Criteria:</strong> {scholarshipDetails.eligbility_criteria}</Typography>
                                                <Typography><strong>Selection Process:</strong> {scholarshipDetails.SelectionProcess}</Typography>
                                                <Typography><strong>Language of Study:</strong> {scholarshipDetails.language_Of_Study}</Typography>
                                                <Typography><strong>Place of Study:</strong> {scholarshipDetails.Place_of_Study}</Typography>
                                                <Typography><strong>Start Date:</strong>{moment.utc(scholarshipDetails.start_Date).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>End Date:</strong>{moment.utc(scholarshipDetails.End_Date).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>Submission Deadline:</strong>{moment.utc(scholarshipDetails.submission_date).format('YYYY-MM-DD')}</Typography>
                                                <Typography><strong>Number of Seats Available:</strong> {scholarshipDetails.number_of_seats_available}</Typography>
                                                <Typography><strong>Expenses Covered:</strong> ${scholarshipDetails.expenses_coverd}</Typography>
                                                <Typography><strong>Terms and Conditions:</strong> {scholarshipDetails.term_and_conditions}</Typography>
                                                <Typography><strong>Key Personnel Details:</strong> {scholarshipDetails.key_personnel_details}</Typography>
                                                <Typography><strong>Approval Status:</strong> {scholarshipDetails.approval_status}</Typography>
                                                <Typography><strong>Website:</strong> <a href={scholarshipDetails.website_link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.website_link}</a></Typography>
                                                <Typography><strong>Application Form:</strong> <a href={scholarshipDetails.form_Link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.form_Link}</a></Typography>
                                              </Box>
                                            )
                                          )}
                                        </Box>
                                      </Modal>
                                    </div>
                                  </li>
                                  <li className="d-flex justify-content-center align-items-center">
                                    <button
                                      className="dropdown-item text-success"
                                      onClick={() => handleAccept(scholarship._id)}
                                    >
                                      <div className="span-container"><FontAwesomeIcon icon={faCheck} />
                                        <span>Accept</span>
                                      </div>
                                    </button>
                                  </li>
                                  <li className="d-flex justify-content-center align-items-center">
                                    <button
                                      className="dropdown-item text-danger"
                                      onClick={() => handleReject(scholarship._id)}
                                    >
                                      <div className="span-container">
                                        <FontAwesomeIcon icon={faXmark} />
                                        <span>Reject</span>
                                      </div>
                                    </button>
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
                          {expandedRowP === index && isSmallScreen && (
                            <tr className="expanded-row expanded-row-content">
                              <td colSpan="4" className="full-width-expanded">
                                <div><strong>Organization Name:</strong>
                                  {organizationNames[scholarship._id] ? (
                                    organizationNames[scholarship._id]
                                  ) : (
                                    <Skeleton width="100px" />
                                  )}
                                </div>
                                <div><strong>Submission Date:</strong>
                                  {moment.utc(scholarship.submission_date).format('YYYY-MM-DD')}
                                </div>
                                <div className="dropdown d-md-none drop-down-buttons">
                                  <ul className='expanded-delete'>
                                    <li className="d-flex align-items-center">
                                      <div>
                                        <button
                                          className="dropdown-item"
                                          onClick={() => viewDetailsP(scholarship._id)}
                                        >
                                          <FontAwesomeIcon icon={faEye} className="px-1" />
                                          View
                                        </button>
                                        <Modal
                                          keepMounted
                                          open={open}
                                          onClose={handleClose}
                                          aria-labelledby="scholarship-details-title"
                                          aria-describedby="scholarship-details-description"
                                        >
                                          <Box sx={style}>
                                            <Typography id="scholarship-details-title" variant="h6" component="h2">
                                              <strong>Scholarship Details</strong>
                                            </Typography>
                                            {loadingDetails ? (
                                              <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                                                <Skeleton variant="rectangular" height={200} sx={{ my: 2, borderRadius: '8px' }} />
                                                <Skeleton variant="text" width="60%" />
                                                <Skeleton variant="text" width="80%" />
                                                <Skeleton variant="text" width="50%" />
                                                <Skeleton variant="text" width="90%" />
                                                <Skeleton variant="text" width="70%" />
                                              </Box>
                                            ) : (
                                              scholarshipDetails && (
                                                <Box id="scholarship-details-description" sx={{ mt: 2 }}>
                                                  <Box sx={{ my: 2 }}>
                                                    <img src={scholarshipDetails.scholarship_picture} alt="Scholarship" style={{ width: '100%', borderRadius: '8px' }} />
                                                  </Box>
                                                  <Typography><strong>Name:</strong> {scholarshipDetails.scholarsip_name}</Typography>
                                                  <Typography><strong>Brief Description:</strong> {scholarshipDetails.brief_descrition}</Typography>
                                                  <Typography><strong>Type:</strong> {scholarshipDetails.type}</Typography>
                                                  <Typography><strong>Eligibility Criteria:</strong> {scholarshipDetails.eligbility_criteria}</Typography>
                                                  <Typography><strong>Selection Process:</strong> {scholarshipDetails.SelectionProcess}</Typography>
                                                  <Typography><strong>Language of Study:</strong> {scholarshipDetails.language_Of_Study}</Typography>
                                                  <Typography><strong>Place of Study:</strong> {scholarshipDetails.Place_of_Study}</Typography>
                                                  <Typography><strong>Start Date:</strong>{moment.utc(scholarshipDetails.start_Date).format('YYYY-MM-DD')} </Typography>
                                                  <Typography><strong>End Date:</strong>{moment.utc(scholarshipDetails.End_Date).format('YYYY-MM-DD')} </Typography>
                                                  <Typography><strong>Submission Deadline:</strong>{moment.utc(scholarshipDetails.submission_date).format('YYYY-MM-DD')}</Typography>
                                                  <Typography><strong>Number of Seats Available:</strong> {scholarshipDetails.number_of_seats_available}</Typography>
                                                  <Typography><strong>Expenses Covered:</strong> ${scholarshipDetails.expenses_coverd}</Typography>
                                                  <Typography><strong>Terms and Conditions:</strong> {scholarshipDetails.term_and_conditions}</Typography>
                                                  <Typography><strong>Key Personnel Details:</strong> {scholarshipDetails.key_personnel_details}</Typography>
                                                  <Typography><strong>Approval Status:</strong> {scholarshipDetails.approval_status}</Typography>
                                                  <Typography><strong>Website:</strong> <a href={scholarshipDetails.website_link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.website_link}</a></Typography>
                                                  <Typography><strong>Application Form:</strong> <a href={scholarshipDetails.form_Link} target="_blank" rel="noopener noreferrer">{scholarshipDetails.form_Link}</a></Typography>
                                                </Box>
                                              )
                                            )}
                                          </Box>
                                        </Modal>
                                      </div>
                                    </li>
                                    <li className="d-flex justify-content-center align-items-center">
                                      <button
                                        className="dropdown-item text-success"
                                        onClick={() => handleAccept(scholarship._id)}
                                      >
                                        <div className="span-container"><FontAwesomeIcon icon={faCheck} />
                                          <span>Accept</span>
                                        </div>
                                      </button>
                                    </li>
                                    <li className="d-flex justify-content-center align-items-center">
                                      <button
                                        className="dropdown-item text-danger"
                                        onClick={() => handleReject(scholarship._id)}
                                      >
                                        <div className="span-container">
                                          <FontAwesomeIcon icon={faXmark} />
                                          <span>Reject</span>
                                        </div>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No Pending Scholarships</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pagination
                  count={Math.ceil(filteredScholarshipsP.length / itemsPerPage)}
                  page={currentPageP}
                  onChange={handleChangePageP}
                  className='pagination-search'
                  size="large"
                />
              </>
            )}
          </div>
        </div>
        <div className="pieChartContainer">
          {loading ? (
            <Skeleton
              variant="circular"
              width={window.innerWidth <= 850 ? 300 : 400}
              height={window.innerWidth <= 850 ? 300 : 400}
            />
          ) : (
            <PieChart
              series={[
                {
                  data: window.innerWidth <= 850
                    ? [
                      { id: 0, value: scholarships.length, color: '#4caf50', label: 'Accepted' },
                      { id: 1, value: pendingScholarships.length, color: '#ff9800', label: 'Pending' },
                      { id: 2, value: rejectedScholarships.length, color: '#f44336', label: 'Rejected' },
                    ]
                    : [
                      { id: 0, value: scholarships.length, label: 'Accepted Scholarships', color: '#4caf50' },
                      { id: 1, value: pendingScholarships.length, label: 'Pending Scholarships', color: '#ff9800' },
                      { id: 2, value: rejectedScholarships.length, label: 'Rejected Scholarships', color: '#f44336' },
                    ],
                },
              ]}
              width={window.innerWidth <= 850 ? 400 : 800}
              height={window.innerWidth <= 850 ? 200 : 400}
              className="customPieChart"
            />
          )}
        </div>
    </>
  );
}
