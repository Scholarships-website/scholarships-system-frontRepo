import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Skeleton, Pagination, useMediaQuery } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faUserXmark, faSortUp, faSortDown, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import "./Application.css"
const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};

const ApplicationsList = ({ advertiserId }) => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();
  const { roleId } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const itemsPerPage = 5;

  useEffect(() => {
    if (roleId) {
      fetchScholarships();
    }
  }, [roleId]);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/advertisers/${roleId}/scholarships/accept`);
      const scholarships = response.data;
  
      const scholarshipsWithCounts = await Promise.all(
        scholarships.map(async (scholarship) => {
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${scholarship._id}/Applied-students`,
              {
                validateStatus: (status) => status === 200 || status === 404, // Handle 200 and 404 as valid statuses
              }
            );
  
            // If status is 404, assume no applications and set applicationCount to 0
            const applicationCount = res.status === 404 ? 0 : res.data.length;
            return { ...scholarship, applicationCount };
          } catch (error) {
            console.error(`Error fetching applications for scholarship ${scholarship._id}:`, error);
            return { ...scholarship, applicationCount: 0 }; // Fallback for other errors
          }
        })
      );
  
      // Filter out scholarships with 0 applications
      const filteredScholarships = scholarshipsWithCounts.filter(
        (scholarship) => scholarship.applicationCount > 0
      );
  
      setScholarships(filteredScholarships);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleScholarshipClick = (scholarshipId) => {
    navigate(`/advertiserDashboard/applications/${scholarshipId}`);
  };
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

  const filteredScholarships = scholarships.filter((scholarship) => {
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
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
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
  const paginatedScholarships = sortedScholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <PageContainer title="Scholarship Applications" breadcrumbs={<Typography>Dashboard / Scholarships </Typography>}>
      {loading || !roleId ? (
        <div>
          <Skeleton variant="text" width={410} height={60} />
          <Skeleton variant="rectangular" width={800} height={400} style={{ marginTop: '10px' }} />
        </div>
      ) : (
        <>
          <div className="mb-2 justify-content-between pb-3">
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
            <>
              <table className="table table-hover bg-transparent">
                <thead>
                  <tr className="bg-transparent">
                    <th scope="col">#</th>
                    <th scope="col" onClick={() => handleSort('scholarsip_name')} className="sortable-column">
                      Scholarship Name {renderSortIcon('scholarsip_name')}
                    </th>
                    <th scope="col" style={{ textAlign: 'center' }} onClick={() => handleSort('applicationCount')} className="sortable-column">
                    Number of Applications {renderSortIcon('applicationCount')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedScholarships.length ? (
                    paginatedScholarships.map((scholarship, index) => (
                      <React.Fragment key={scholarship._id}>
                        <tr onClick={() => handleScholarshipClick(scholarship._id)} style={{ cursor: 'pointer' }}>
                          <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                          <td>{scholarship.scholarsip_name}</td>
                          <td style={{ textAlign: 'center' }}><span className='numberOfApp'>{scholarship.applicationCount}</span></td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">There are no Scholarship Applications</td>
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
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default ApplicationsList;
