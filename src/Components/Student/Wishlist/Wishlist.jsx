import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faUserXmark, faSortUp, faSortDown, faChevronDown, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Skeleton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from "@mui/icons-material/Favorite";
import '../../Student/studentDash.css'
import { UserContext } from "../../../Context/UserContext";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
  const itemsPerPage = 5;
  let { userToken, roleId } = useContext(UserContext);
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/${roleId}/wishlist`);
      setWishlist(data);
      console.log(data);
      if (data.length > 0) {
        await fetchWishlistDetails();
      } else {
        setWishlistDetails([]); // Clear details if no IDs
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const removeFromWishlist = async (scholarshipId) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this scholarship from your wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmResult.isConfirmed) {
      try {
        const endpoint = `${import.meta.env.VITE_BASE_URL}/api/v1/students/wishlist/${scholarshipId}/delete`;
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        const response = await axios.put(endpoint, {}, config);
        if (response.status === 200) {
          toast.success('Scholarship successfully removed from the wishlist.', {
            position: 'top-right',
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        } else {
          console.log('Something went wrong. Please try again.');
        }
        await fetchWishlist();
      } catch (error) {
        console.error('Error removing scholarship from wishlist:', error);
        toast.error('An error occurred while removing the scholarship from the wishlist.', {
          position: 'bottom-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      Swal.fire('Cancelled', 'The scholarship was not removed from the wishlist.', 'info');
    }
  };

  const fetchWishlistDetails = async () => {
    setLoadingDetails(true);
    try {
      const detailsPromises = wishlist.map((id) =>
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${id}`)
      );
      const responses = await Promise.all(detailsPromises);

      const details = responses.map((response) => response.data);
      setWishlistDetails(details); // Store detailed data
      console.log("Wishlist Details:", details);
    } catch (error) {
      console.error("Error fetching wishlist details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (roleId) {
      fetchWishlist();
    }
  }, [roleId]);

  useEffect(() => {
    if (wishlist.length > 0) {
      fetchWishlistDetails();
    }
  }, [wishlist]);

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

  const filteredWishlist = wishlistDetails.filter((item) => {
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
    <div className="student-admin wishlist-table">
      <div className="mb-2 justify-content-between pb-3">
        <h1 className="ps-4 main-col mb-4">Wishlist</h1>
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
        {loadingDetails ? (
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
                  <th scope="row"><Skeleton variant="text" width="100%" /></th>
                  <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Skeleton variant="circular" width="60px" height="60px" />
                  </td>
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
                        <td><img src={item.scholarship_picture} alt="Scholarship" style={{ width: '60px', height: '60px', borderRadius: '50%' }}  loading="lazy" /></td>
                        <td>{item.scholarsip_name}</td>
                        <td className="d-none d-md-table-cell">{item.type}</td>
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
                              <li><div>
                                <button
                                  onClick={() => removeFromWishlist(item._id)}
                                  title="remove from favorites"
                                  className='mt-15px'
                                >
                                  <FavoriteIcon color={"error"} />
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
                          <td colSpan="4" className="full-width-expanded ">
                            <div className='left'><strong>Type:</strong> {item.type}</div>
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
                                <div>
                                  <li>
                                    <button className="dropdown-item"
                                      onClick={() => removeFromWishlist(item._id)}
                                      title="remove from favorites"
                                    >
                                      <FavoriteIcon color={"error"} />
                                      remove from favorites
                                    </button>
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