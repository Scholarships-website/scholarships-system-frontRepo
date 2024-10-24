import React, { useContext, useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../Context/UserContext';
import RequestedScholarships from './RequestedScholarships'; // Import RequestedScholarships component

export default function Scholarships() {
  const { userToken } = useContext(UserContext);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScholarships = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/scholarships`);
      console.log(data);
      setScholarships(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
          setScholarships(prevScholarships => prevScholarships.filter(scholarship => scholarship.id !== id));
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

  useEffect(() => {
    fetchScholarships();
  }, []);

  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredScholarships = scholarships.filter((scholarship) => {
  //   return scholarship.name.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  return (
    <>
      <div className="scholarships-admin">
        <div className=" mt-3 mb-2 justify-content-between border-bottom py-3">
          <h1 className='ps-4 main-col'>Scholarships</h1>
          {/* <form className="me-3 search-admin" role="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#418447",}} />
            <input
              className="form-control me-5"
              type="search"
              placeholder="Search by name"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form> */}
        </div>

        <div className="table-container ps-3">
          {loading ? (
            <Loading />
          ) : (
            <table className="table table-hover bg-transparent">
              <thead>
                <tr className='bg-transparent'>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.length ? (
                  scholarships.map((scholarship, index) => (
                    <tr key={scholarship._id}>
                      <th scope="row">{++index}</th>
                      <td>{scholarship.name}</td>
                      <td>{scholarship.description}</td>
                      <td>
                        <div className="dropdown">
                          <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </button>
                          <ul className="dropdown-menu">
                            <li className='d-flex justify-content-center align-items-center'>
                              <button className="dropdown-item text-danger" onClick={() => deleteScholarship(scholarship.id)}>
                                <FontAwesomeIcon icon={faUserXmark} className='px-1' />Delete
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
          )}
        </div>
              {/* Render RequestedScholarships component and pass down setScholarships */}
      <RequestedScholarships setScholarships={setScholarships} />
      </div>

    </>
  );
}
