import React, { useContext, useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../Context/UserContext';
import RequestedScholarships from './RequestedScholarships'; // Import RequestedScholarships component
import { PieChart } from '@mui/x-charts';

export default function Scholarships() {
  const { userToken } = useContext(UserContext);
  const [scholarships, setScholarships] = useState([]);
  const [pendingScholarships, setPendingScholarships] = useState([]);
  const [rejectedScholarships, setRejectedScholarships] = useState([]);

  const [loading, setLoading] = useState(true);
  const [organizationNames, setOrganizationNames] = useState({});

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      const accepted = await axios.get(`http://localhost:3000/api/v1/scholarships`);
      const pending = await axios.get(`http://localhost:3000/api/v1/admin/scholarhips/pending`);
      const rejected = await axios.get(`http://localhost:3000/api/v1/admin/scholarhips/reject`);
      // console.log(accepted.data);
      // console.log(pending.data);
      // console.log(rejected.data);
      setScholarships(accepted.data);
      setPendingScholarships(pending.data);
      setRejectedScholarships(rejected.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch organization name by ID
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
          scholarships.map(async (scholarship) => {
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

    if (scholarships.length) {
      fetchOrganizationNames();
    }
  }, [scholarships]);

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

  useEffect(() => {
    fetchScholarships();
  }, []);

  return (
    <>
      <div className="scholarships-admin">
        <div className="mt-3 mb-2 justify-content-between border-bottom py-3">
          <h1 className="ps-4 main-col">Scholarships</h1>
        </div>

        <div className="table-container ps-3">
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
                  {/* <th scope="col">Key Personnel</th> */}
                  <th scope="col">Submission Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.length ? (
                  scholarships.map((scholarship, index) => (
                    <tr key={scholarship._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{scholarship.scholarsip_name}</td>
                      <td>{scholarship.brief_descrition}</td>
                      <td>{organizationNames[scholarship._id] || 'Loading...'}</td>
                      {/* <td>{scholarship.key_personnel_details}</td> */}
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
          )}
        </div>
        {/* Render RequestedScholarships component and pass down setScholarships */}
        <RequestedScholarships setScholarships={setScholarships} />
        <div className="pieChartContainer">
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
        </div>


      </div>
    </>
  );
}
