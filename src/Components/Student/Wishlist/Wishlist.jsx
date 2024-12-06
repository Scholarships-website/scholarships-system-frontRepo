import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faUserXmark, faSortUp, faSortDown, faChevronDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Skeleton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 7;

  const fetchWishlist = async () => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/scholarships`);
        setWishlist(data);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };
  useEffect(() => {
    fetchWishlist();
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

  const filteredWishlist = wishlist.filter((item) => {
    return (
      item.scholarsip_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedWishlist = [...filteredWishlist].sort((a, b) => {
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

  const paginatedWishlist = sortedWishlist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <div className="student-admin">
      <div className="mb-2 justify-content-between pb-3">
        <h1 className="ps-4 main-col">Wishlist</h1>
        <form className="me-3 search-admin" role="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#418447" }} />
          <input
            className="form-control me-5"
            type="search"
            placeholder="Search by Name"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
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
                <th scope="col">Scholarship Image</th>
                <th scope="col" className="sortable-column">Scholarship Name</th>
                <th scope="col" className="d-none d-md-table-cell">Type</th>
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
                  <th scope="col" className="d-none d-md-table-cell">Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedWishlist.length ? (
                  paginatedWishlist.map((item, index) => (
                    <React.Fragment key={item._id}>
                      <tr onClick={() => handleExpandRow(index)}>
                        <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                        <td><img src={item.scholarship_picture} alt="Scholarship" style={{ width: '60px', height: '60px', borderRadius: '50%' }} /></td>
                        <td>{item.scholarsip_name}</td>
                        <td className="d-none d-md-table-cell">{item.type}</td>
                        <td className="action d-none d-md-table-cell">
                          <div className="dropdown">
                            <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <div>
                                  <button
                                    className="dropdown-item"
                                  >
                                    <FontAwesomeIcon icon={faEye} className="px-1" />
                                    <Link
                                      to={`/scholarship-detail/${item._id}`}
                                    >
                                      View Details
                                    </Link>
                                  </button>
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
                          <td colSpan="4" className="full-width-expanded">
                            <div><strong>Type:</strong> {item.type}</div>
                            <div className="dropdown d-md-none drop-down-buttons">
                              <ul className='expanded-delete'>
                                <li>
                                <div>
                                  <button
                                    className="dropdown-item"
                                  >
                                    <FontAwesomeIcon icon={faEye} className="px-1" />
                                    <Link
                                      to={`/scholarship-detail/${scholarship._id}`}
                                    >
                                      View Details
                                    </Link>
                                  </button>
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
                    <td colSpan="7">No items in the wishlist</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(filteredWishlist.length / itemsPerPage)}
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

export default Wishlist