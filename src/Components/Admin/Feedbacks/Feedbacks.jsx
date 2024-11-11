import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEllipsisVertical, faSortDown, faSortUp, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Pagination, Skeleton, Tooltip, useMediaQuery } from '@mui/material';
import { PieChart } from '@mui/x-charts';

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};

export default function Feedbacks() {
  let [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const itemsPerPage = 5;
  const [ratingCounts, setRatingCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/feedbacks`);
      // console.log(data);
      setFeedbacks(data);
      setLoading(false);
      // Count ratings
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      data.forEach(feedback => {
        if (feedback.rating >= 1 && feedback.rating <= 5) {
          counts[feedback.rating]++;
        }
      });
      setRatingCounts(counts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
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
          await axios.delete(`http://localhost:3000/api/v1/feedbacks/${id}`);
          // Remove the deleted Feedback
          setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Feedback has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting Feedback:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the Feedback.",
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = sortByKey(a, sortConfig.key);
      const bValue = sortByKey(b, sortConfig.key);
      const order = sortConfig.direction === 'ascending' ? 1 : -1;
      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedFeedbacks = sortedFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
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
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <div className="student-admin">
      <div className="mb-2 justify-content-between pb-3">
        <h1 className='ps-4 main-col'>Feedbacks on the Website</h1>
      </div>
      <div className="table-container ps-3">
        {loading ? (
          <table className="table table-hover bg-transparent">
            <thead>
              <tr className="bg-transparent">
                <th scope="col">#</th>
                <th scope="col" className="sortable-column">User name</th>
                <th scope="col" className="d-none d-md-table-cell" >Feedbacks</th>
                <th scope="col">Rating</th>
                <th scope="col" className="d-none d-md-table-cell" >Created At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <tr key={index}>
                  <th scope="row"><Skeleton variant="text" width={20} /></th>
                  <td><Skeleton variant="text" width="80%" /></td>
                  <td className="d-none d-md-table-cell"><Skeleton variant="text" width="80%" /></td>
                  <td><Skeleton variant="text" width="80%" /></td>
                  <td className="d-none d-md-table-cell"><Skeleton variant="text" width="80%" /></td>
                  <td><Skeleton variant="rectangular" width={50} height={20} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <table className="table table-hover bg-transparent ">
              <thead>
                <tr className='bg-transparent '>
                  <th scope="col">#</th>
                  <th scope="col" onClick={() => handleSort('user_Account_id.username')} className="sortable-column">
                    User name {renderSortIcon('user_Account_id.username')}
                  </th>
                  <th scope="col" className="d-none d-md-table-cell">Feedback</th>
                  <th scope="col" onClick={() => handleSort('rating')} className="sortable-column">
                    Rating {renderSortIcon('rating')}
                  </th>
                  <th scope="col" onClick={() => handleSort('createdAt')} className="sortable-column d-none d-md-table-cell">
                    Created At {renderSortIcon('createdAt')}
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFeedbacks.length ? (
                  paginatedFeedbacks.map((feedback, index) => (
                    <React.Fragment key={feedback._id}>
                      <tr onClick={() => handleExpandRow(index)}>
                        <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                        <td>{feedback.user_Account_id.username}</td>
                        <td className="d-none d-md-table-cell" style={{ width: '200px' }}>{feedback.content}</td>
                        <td>{feedback.rating}</td>
                        <td className="d-none d-md-table-cell">{new Date(feedback.createdAt).toLocaleString()}</td>
                        <td className="action d-none d-md-table-cell">
                          <div className="dropdown">
                            <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            <ul className="dropdown-menu">
                              <li className='d-flex justify-content-center align-items-center'>
                                <button className="dropdown-item text-danger" onClick={() => deleteFeedback(feedback._id)}>
                                  <FontAwesomeIcon icon={faUserXmark} className='px-1' />
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
                            <div><strong>Feedback:</strong> {feedback.content}</div>
                            <div><strong>Created At:</strong>{new Date(feedback.createdAt).toLocaleString()}</div>
                            <div className="dropdown d-md-none drop-down-buttons">
                              <ul className="dropdown-menu">
                                <li className='d-flex justify-content-center align-items-center'>
                                  <button className="dropdown-item text-danger" onClick={() => deleteFeedback(feedback._id)}>
                                    <FontAwesomeIcon icon={faUserXmark} className='px-1' />
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
                    <td colSpan="7">No Feedbacks</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(feedbacks.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className='pagination-search'
              size="large"
            />
          </>
        )}
      </div>
      {/* Pie Chart for Ratings */}
      <div className="pieChartContainer">
        {loading ? (
          <Skeleton
            variant="circular"
            width={window.innerWidth <= 850 ? 200 : 400}
            height={window.innerWidth <= 850 ? 200 : 400}
          />
        ) : (
          <PieChart
            series={[
              {
                data: [
                  { id: '1 Star', value: ratingCounts[1], label: '1 Star', color: '#FF5733' },
                  { id: '2 Stars', value: ratingCounts[2], label: '2 Stars', color: '#FFC300' },
                  { id: '3 Stars', value: ratingCounts[3], label: '3 Stars', color: '#28B463' },
                  { id: '4 Stars', value: ratingCounts[4], label: '4 Stars', color: '#3498DB' },
                  { id: '5 Stars', value: ratingCounts[5], label: '5 Stars', color: '#9B59B6' },
                ],
              },
            ]}
            width={window.innerWidth <= 850 ? 400 : 800}
            height={window.innerWidth <= 850 ? 200 : 400}
            className="customPieChart"
          />
        )}
      </div>
    </div>
  );
}
