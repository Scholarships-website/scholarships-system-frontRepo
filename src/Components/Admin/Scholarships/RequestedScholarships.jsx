import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading'; // Assuming you have a Loading component for the loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../Context/UserContext'; // Assuming you have a UserContext

export default function RequestedScholarships({ setScholarships }) {
  const { userToken } = useContext(UserContext);
  const [requestedScholarships, setRequestedScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [organizationNames, setOrganizationNames] = useState({});

  // Fetch requested scholarships from the API
  const fetchRequestedScholarships = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/admin/scholarhips/pending`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(data);
      setRequestedScholarships(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
      // Remove the accepted scholarship from the requested list
      // setRequestedScholarships((prevScholarships) =>
      //   prevScholarships.filter((scholarship) => scholarship.id !== id)
      // );
      // Add the accepted scholarship to the main scholarships list
      // setScholarships((prevScholarships) => [...prevScholarships, acceptedScholarship]);
      Swal.fire('Accepted!', 'The scholarship has been accepted.', 'success');
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
      // Remove the rejected scholarship from the requested list
      // setRequestedScholarships((prevScholarships) =>
      //   prevScholarships.filter((scholarship) => scholarship.id !== id)
      // );
      // Swal.fire('Rejected!', 'The scholarship has been rejected.', 'success');
    } catch (error) {
      // console.error('Error rejecting scholarship:', error);
      Swal.fire('Error!', 'There was a problem rejecting the scholarship.', 'error');
    }
  };
  const getOrganizationName = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/advertisers/${id}`);
      // console.log(data);
      return data.organization_name; // Assuming organization_name is in the response
    } catch (error) {
      console.error(error);
      return 'Unknown Organization'; // Fallback in case of error
    }
  };
  // Fetch organization names for all scholarships
  useEffect(() => {
    const fetchOrganizationNames = async () => {
      try {
        const names = await Promise.all(
          requestedScholarships.map(async (scholarship) => {
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

    if (requestedScholarships.length) {
      fetchOrganizationNames();
    }
  }, [requestedScholarships]);
  // Fetch requested scholarships on component mount
  useEffect(() => {
    fetchRequestedScholarships();
  }, []);

  return (
    <>
      <div className="requestedScholarships d-flex">
        <div className="d-flex mt-3 mb-2 justify-content-between border-bottom py-3">
          <h1 className='ps-4 main-col test m-0'>Pending Scholarships</h1>
        </div>                <div className="table-container ps-3">
          {loading ? (
            <Loading />
          ) : (
            <table className="table table-hover bg-transparent">
              <thead>
                <tr className="bg-transparent">
                  <th scope="col">#</th>
                  <th scope="col">Scholarship Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Organization Name</th>
                  <th scope="col">Key Personnel</th>
                  <th scope="col">Submission Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {requestedScholarships.length ? (
                  requestedScholarships.map((scholarship, index) => (
                    <tr key={scholarship._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{scholarship.scholarsip_name}</td>
                      <td>{scholarship.brief_descrition}</td>
                      <td>{organizationNames[scholarship._id] || 'Loading...'}</td>
                      <td>{scholarship.key_personnel_details}</td>
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
          )}
        </div>
      </div>
    </>
  );
}
