import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faUserXmark, faSortUp, faSortDown, faChevronDown, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Skeleton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from "@mui/icons-material/Favorite";
import '../../Student/studentDash.css'
import { UserContext } from "../../../Context/UserContext";

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};
function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 5;
  let { userToken, roleId } = useContext(UserContext);

  const fetchApplicatins = async () => {
    try {
      //i will change this 
      const { data } = await axios.get(`http://localhost:3000/api/v1/scholarships`);
      setApplications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApplicatins();
  }, []);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };
  const filteredApplications = applications.filter((item) => {
    return (
      item.scholarsip_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const sortedApplications = [...filteredApplications].sort((a, b) => {
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
  const paginatedApplications = sortedApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const getStatusClass = (status) => {
    switch (status) {
      case 'accept':
        return 'text-success bg-success-light';
      case 'pending':
        return 'text-warning bg-warning-light';
      case 'rejected':
        return 'text-danger bg-danger-light';
      default:
        return '';
    }
  };
  return (
    <div className="student-admin wishlist-table">
      <div className="mb-2 justify-content-between pb-3">
        <h1 className="ps-4 main-col mb-4">Applications</h1>
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
                  <th scope="row"><Skeleton variant="text" width={20} /></th>
                  <td><Skeleton variant="text" width="30%" /></td>
                  <td><Skeleton variant="text" width="80%" /></td>
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
                  <th scope="col">Scholarship Image</th>
                  <th scope="col" onClick={() => handleSort('scholarsip_name')} className="sortable-column">
                    Scholarship Name {renderSortIcon('scholarsip_name')}
                  </th>
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
                        <td><img src={item.scholarship_picture} alt="Scholarship" style={{ width: '60px', height: '60px', borderRadius: '50%' }} /></td>
                        <td>{item.scholarsip_name}</td>
                        <td
                          className={`d-none d-md-table-cell `}
                        >
                          <span className={`status ${getStatusClass(item.approval_status)}`}>{item.approval_status}</span>
                        </td>
                        <td className="action d-none d-md-table-cell">
                          <div>
                            <ul className='wishlist-menu'>
                              <li>
                                <div>
                                  <Link to={`/scholarship-detail/${item._id}`} className="details-scholarship-link">
                                    <button title="view details" className='mt-15px'>
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
                            <div className={`left status ${getStatusClass(item.approval_status)} `}><strong>Status:</strong> {item.approval_status}</div>
                            <div className="dropdown d-md-none drop-down-buttons ">
                              <ul className='expanded-delete'>
                                <li>
                                  <div>
                                    <Link to={`/scholarship-detail/${item._id}`} className="details-scholarship-link">
                                      <button title="view details" className="dropdown-item">
                                        <FontAwesomeIcon icon={faEye} className="px-1" />
                                        view details
                                      </button>
                                    </Link>
                                  </div>
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
                    <td colSpan="7">No Applications</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(filteredApplications.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className='pagination-search'
              size="large"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Applications