import React, { useContext, useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisVertical, faUserXmark, faXmark, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../Context/UserContext';
import { PieChart } from '@mui/x-charts';
import { Pagination, Skeleton } from '@mui/material'; // Import Skeleton

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
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

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      const accepted = await axios.get(`http://localhost:3000/api/v1/scholarships`);
      const pending = await axios.get(`http://localhost:3000/api/v1/admin/scholarhips/pending`);
      const rejected = await axios.get(`http://localhost:3000/api/v1/admin/scholarhips/reject`);
      setScholarships(accepted.data);
      setPendingScholarships(pending.data);
      setRejectedScholarships(rejected.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getOrganizationName = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/advertisers/${id}`);
      return data.organization_name; // Assuming organization_name is in the response
    } catch (error) {
      console.error(error);
      return 'Unknown Organization'; // Fallback in case of error
    }
  };

  // Fetch organization names for all scholarships and pending scholarships
  useEffect(() => {
    const fetchOrganizationNames = async () => {
      try {
        const allScholarships = [...scholarships, ...pendingScholarships];
        const names = await Promise.all(
          allScholarships.map(async (scholarship) => {
            const organizationName = await getOrganizationName(scholarship.advertiser_id);
            return { [scholarship._id]: organizationName };
          })
        );
        const namesObj = names.reduce((acc, name) => ({ ...acc, ...name }), {});
        setOrganizationNames(namesObj);
      } catch (error) {
        console.error("Error fetching organization names:", error);
      }
    };
    if (scholarships.length || pendingScholarships.length) {
      fetchOrganizationNames();
    }
  }, [scholarships, pendingScholarships]);

  // Delete scholarship
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

  // Handle accepting a scholarship
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

  // Handle rejecting a scholarship
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

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };
  const sortedScholarshipsS = [...scholarships].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = sortByKey(a, sortConfig.key);
      const bValue = sortByKey(b, sortConfig.key);
      const order = sortConfig.direction === 'ascending' ? 1 : -1;
      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });
  const sortedScholarshipsP = [...pendingScholarships].sort((a, b) => {
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
  return (
    <>
      <div className="scholarships-admin">
        <div className="mt-3 mb-2 justify-content-between border-bottom py-3">
          <h1 className="ps-4 main-col">Scholarships</h1>
        </div>

        <div className="table-container ps-3">
          {loading ? (
            <table className="table table-hover bg-transparent">
              <thead>
                <tr className="bg-transparent">
                  <th scope="col">#</th>
                  <th scope="col">Scholarship Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Organization Name</th>
                  {/* <th scope="col">Key Personnel</th> */}
                  <th scope="col">Submission Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <tr key={index}>
                    <th scope="row"><Skeleton variant="text" width={20} /></th>
                    <td><Skeleton variant="text" width="80%" /></td>
                    <td><Skeleton variant="text" width="80%" /></td>
                    <td><Skeleton variant="text" width="80%" /></td>
                    <td><Skeleton variant="text" width="80%" /></td>
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
                    <th scope="col" >Description</th>
                    <th scope="col" >Organization Name </th>
                    {/* <th scope="col">Key Personnel</th> */}
                    <th scope="col" onClick={() => handleSort('submission_date')} className="sortable-column">Submission Date {renderSortIcon('submission_date')}</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedScholarshipsS.length ? (
                    paginatedScholarshipsS.map((scholarship, index) => (
                      <tr key={scholarship._id}>
                        <th scope="row">{(currentPageS - 1) * itemsPerPage + index + 1}</th>
                        <td>{scholarship.scholarsip_name}</td>
                        <td>{scholarship.brief_descrition}</td>
                        <td>
                          {organizationNames[scholarship._id] ? (
                            organizationNames[scholarship._id]
                          ) : (
                            <Skeleton width="100px" />
                          )}
                        </td>                        {/* <td>{scholarship.key_personnel_details}</td> */}
                        <td>
                          {new Date(scholarship.submission_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        <td>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No Scholarships</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                count={Math.ceil(scholarships.length / itemsPerPage)}
                page={currentPageS}
                onChange={handleChangePageS}
                className='pagination-search'
                size="large"
              />
            </>
          )}
        </div>
        {/* <pendingScholarships /> */}
        <div className="requestedScholarships d-flex">
          <div className="d-flex mt-3 mb-2 justify-content-between border-bottom py-3">
            <h1 className='ps-4 main-col test m-0'>Pending Scholarships</h1>
          </div>
          <div className="table-container ps-3">
            {loading ? (
              <table className="table table-hover bg-transparent">
                <thead>
                  <tr className="bg-transparent">
                    <th scope="col">#</th>
                    <th scope="col">Scholarship Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Organization Name</th>
                    {/* <th scope="col">Key Personnel</th> */}
                    <th scope="col">Submission Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index}>
                      <th scope="row"><Skeleton variant="text" width={20} /></th>
                      <td><Skeleton variant="text" width="80%" /></td>
                      <td><Skeleton variant="text" width="80%" /></td>
                      <td><Skeleton variant="text" width="80%" /></td>
                      <td><Skeleton variant="text" width="80%" /></td>
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
                      <th scope="col" >Description</th>
                      <th scope="col" >Organization Name </th>
                      {/* <th scope="col">Key Personnel</th> */}
                      <th scope="col" onClick={() => handleSort('submission_date')} className="sortable-column">Submission Date {renderSortIcon('submission_date')}</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedScholarshipsP.length ? (
                      paginatedScholarshipsP.map((scholarship, index) => (
                        <tr key={scholarship._id}>
                          <th scope="row">{(currentPageP - 1) * itemsPerPage + index + 1}</th>
                          <td>{scholarship.scholarsip_name}</td>
                          <td>{scholarship.brief_descrition}</td>
                          <td>
                            {organizationNames[scholarship._id] ? (
                              organizationNames[scholarship._id]
                            ) : (
                              <Skeleton width="100px" />
                            )}
                          </td>                          {/* <td>{scholarship.key_personnel_details}</td> */}
                          <td>
                            {new Date(scholarship.submission_date).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </td>
                          <td>
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No Pending Scholarships</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pagination
                  count={Math.ceil(pendingScholarships.length / itemsPerPage)}
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
            <Skeleton variant="rectangular" width={800} height={400} />
          ) : (
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: scholarships.length, label: 'Accepted Scholarships', color: '#4caf50' },
                    { id: 1, value: pendingScholarships.length, label: 'Pending Scholarships', color: '#ff9800' },
                    { id: 2, value: rejectedScholarships.length, label: 'Rejected Scholarships', color: '#f44336' },
                  ],
                },
              ]}
              width={800}
              height={400}
              className="customPieChart"
            />
          )}
        </div>
      </div>
    </>
  );
}
