import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faUserXmark, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Pagination, Skeleton } from '@mui/material'; // Import Skeleton

const sortByKey = (object, key) => {
  return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const itemsPerPage = 10;

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/students/`);
      setStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
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
          await axios.delete(`http://localhost:3000/api/v1/students/${id}`);
          setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
          Swal.fire("Deleted!", "Student has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting student:", error);
          Swal.fire("Error!", "There was a problem deleting the student.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchStudents();
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

  const filteredStudents = students.filter((student) => {
    return (
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user_id.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
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

  const paginatedStudents = sortedStudents.slice(
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

  return (
    <div className="student-admin">
      <div className="mt-3 mb-2 justify-content-between border-bottom py-3">
        <h1 className="ps-4 main-col">Students</h1>
        <form className="me-3 search-admin" role="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#418447" }} />
          <input
            className="form-control me-5"
            type="search"
            placeholder="Search by name/email"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
      <div className="table-container ps-3">
        {loading ? (
          // Display skeleton loading effect
          <table className="table table-hover bg-transparent">
            <thead>
              <tr className="bg-transparent">
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
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
                  <th scope="col" onClick={() => handleSort('first_name')} className="sortable-column">
                    First name {renderSortIcon('first_name')}
                  </th>
                  <th scope="col" onClick={() => handleSort('last_name')} className="sortable-column">
                    Last name {renderSortIcon('last_name')}
                  </th>
                  <th scope="col" onClick={() => handleSort('user_id.email')} className="sortable-column">
                    Email {renderSortIcon('user_id.email')}
                  </th>
                  <th scope="col" onClick={() => handleSort('user_id.phoneNumber')} className="sortable-column">
                    Phone Number {renderSortIcon('user_id.phoneNumber')}
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.length ? (
                  paginatedStudents.map((student, index) => (
                    <tr key={student._id}>
                      <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                      <td>{student.first_name}</td>
                      <td>{student.last_name}</td>
                      <td>{student.user_id.email}</td>
                      <td>{student.user_id.phoneNumber}</td>
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
                                onClick={() => deleteStudent(student._id)}
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
                    <td colSpan="7">No Students</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(filteredStudents.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className='pagination-search'
              size="large"
            />
          </>
        )}
      </div>
    </div>
  );
}
