import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisVertical, faUserXmark, faXmark, faSortUp, faSortDown, faChevronDown, faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../../Context/UserContext';
import { PieChart } from '@mui/x-charts';
import { Box, Modal, Pagination, Skeleton, Typography, useMediaQuery } from '@mui/material';
import moment from 'moment';
//{moment.utc(scholarship.start_Date).format('YYYY-MM-DD')}

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};
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
  overflowY: 'auto',
  borderRadius: '8px',
};
function RejectedScholarships() {
  const { userToken, roleId, userId } = useContext(UserContext);
  const [rejectedScholarships, setRejectedScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [open, setOpen] = useState(false);
  const [scholarshipDetails, setScholarshipDetails] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRejectedScholarships = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/reject`);
      setRejectedScholarships(response.data);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roleId) {
      fetchRejectedScholarships();
    }
  }, [roleId]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };
  const filteredScholarships = rejectedScholarships.filter((scholarship) => {
    return (
      scholarship.scholarsip_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = sortByKey(a, sortConfig.key);
      const bValue = sortByKey(b, sortConfig.key);
      const order = sortConfig.direction === 'ascending' ? 1 : -1;
      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedScholarships = sortedScholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

  if (!roleId) {
    return (
      <div>
        <Skeleton variant="text" width={410} height={60} />
        <Skeleton variant="rectangular" width={800} height={400} style={{ marginTop: '10px' }} />
      </div>
    );
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const viewDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/admin/scholarships/reject/${id}`);
      setScholarshipDetails(response.data);
      handleOpen();
      setLoadingDetails(false)
    } catch (error) {
      console.error('Error fetching scholarship details:', error);
      setLoadingDetails(false);
    }
  };
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
          setRejectedScholarships((prevScholarships) =>
            prevScholarships.filter((scholarship) => scholarship._id !== id)
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
  return (
    <>
      <div className="scholarships-admin scholarships-advertiser">
        <div className="mb-2 justify-content-between pb-3">
          <h1 className="ps-4 main-col mb-4">Rejected Scholarships</h1>
          <form className="me-3 search-admin" role="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#418447" }} />
            <input
              className="form-control me-5 col-md-5"
              type="search"
              placeholder="Search by Name"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
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
                  <th scope="col" className='d-none d-md-table-cell'>Place of Study</th>
                  <th scope="col" className='d-none d-md-table-cell'>Language</th>
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
                    <th scope="col" className='d-none d-md-table-cell' >Place of Study</th>
                    <th scope="col" className='d-none d-md-table-cell' >Language</th>
                    <th scope="col" onClick={() => handleSort('submission_date')} className="sortable-column d-none d-md-table-cell">Submission Date {renderSortIcon('submission_date')}</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedScholarships.length ? (
                    paginatedScholarships.map((scholarship, index) => (
                      <React.Fragment key={scholarship._id}>
                        <tr onClick={() => handleExpandRow(index)}>
                          <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                          <td>{scholarship.scholarsip_name}</td>
                          <td className="d-none d-md-table-cell">{scholarship.Place_of_Study}</td>
                          <td className="d-none d-md-table-cell">{scholarship.language_Of_Study}</td>
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
                                                <img src={scholarshipDetails.scholarship_picture} alt="Scholarship" style={{ width: '100%', borderRadius: '8px' }} loading="lazy" />
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
                                              <Typography><strong>Deadline:</strong>{moment.utc(scholarshipDetails.deadline).format('YYYY-MM-DD')} </Typography>
                                              <Typography><strong>Submission Date:</strong>{moment.utc(scholarshipDetails.submission_date).format('YYYY-MM-DD')} </Typography>
                                              <Typography><strong>Number of Seats Available:</strong> {scholarshipDetails.number_of_seats_available}</Typography>
                                              <Typography><strong>Expenses Covered:</strong>{scholarshipDetails.expenses_coverd}</Typography>
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
                                {/* <li className="d-flex justify-content-center align-items-center">
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => deleteScholarship(scholarship._id)}
                                  >
                                    <FontAwesomeIcon icon={faUserXmark} className="px-1" />
                                    Delete
                                  </button>
                                </li> */}

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
                                                  <img src={scholarshipDetails.scholarship_picture} alt="Scholarship" style={{ width: '100%', borderRadius: '8px' }} loading="lazy" />
                                                </Box>
                                                <Typography><strong>Name:</strong> {scholarshipDetails.scholarsip_name}</Typography>
                                                <Typography><strong>Brief Description:</strong> {scholarshipDetails.brief_descrition}</Typography>
                                                <Typography><strong>Type:</strong> {scholarshipDetails.type}</Typography>
                                                <Typography><strong>Eligibility Criteria:</strong> {scholarshipDetails.eligbility_criteria}</Typography>
                                                <Typography><strong>Selection Process:</strong> {scholarshipDetails.SelectionProcess}</Typography>
                                                <Typography><strong>Language of Study:</strong> {scholarshipDetails.language_Of_Study}</Typography>
                                                <Typography><strong>Place of Study:</strong> {scholarshipDetails.Place_of_Study}</Typography>
                                                <Typography><strong>Start Date:</strong>{moment.utc(scholarshipDetails.start_Date).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>End Date:</strong>{moment.utc(scholarshipDetails.End_Date).format('YYYY-MM-DD')}</Typography>
                                                <Typography><strong>Deadline:</strong>{moment.utc(scholarshipDetails.deadline).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>Submission Date:</strong>{moment.utc(scholarshipDetails.submission_date).format('YYYY-MM-DD')} </Typography>
                                                <Typography><strong>Number of Seats Available:</strong> {scholarshipDetails.number_of_seats_available}</Typography>
                                                <Typography><strong>Expenses Covered:</strong> {scholarshipDetails.expenses_coverd}</Typography>
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
                                  {/* <li>
                                    <button className="dropdown-item text-danger" onClick={() => deleteScholarship(scholarship._id)}>
                                      <FontAwesomeIcon icon={faUserXmark} className="px-1" />
                                      Delete
                                    </button>
                                  </li> */}
                                </ul>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No Rejected Scholarships</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                count={Math.ceil(filteredScholarships.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                className='pagination-search'
                size="large"
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default RejectedScholarships