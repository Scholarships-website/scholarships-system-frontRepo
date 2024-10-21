import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading'; // Assuming you have a Loading component for the loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../Context/UserContext'; // Assuming you have a UserContext

export default function RequestedScholarships({ setScholarships }) {
    const { userToken } = useContext(UserContext);
    const [requestedScholarships, setRequestedScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch requested scholarships from the API
    const fetchRequestedScholarships = async () => {
        try {
            const { data } = await axios.get(`https://localhost:7107/api/RequestedScholarships`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            setRequestedScholarships(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Handle accepting a scholarship
    const handleAccept = async (id) => {
        try {
            const { data: acceptedScholarship } = await axios.post(
                `https://localhost:7107/api/RequestedScholarships/${id}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            // Remove the accepted scholarship from the requested list
            setRequestedScholarships((prevScholarships) =>
                prevScholarships.filter((scholarship) => scholarship.id !== id)
            );
            // Add the accepted scholarship to the main scholarships list
            setScholarships((prevScholarships) => [...prevScholarships, acceptedScholarship]);
            Swal.fire('Accepted!', 'The scholarship has been accepted.', 'success');
        } catch (error) {
            console.error('Error accepting scholarship:', error);
            Swal.fire('Error!', 'There was a problem accepting the scholarship.', 'error');
        }
    };

    // Handle rejecting a scholarship
    const handleReject = async (id) => {
        try {
            await axios.post(
                `https://localhost:7107/api/RequestedScholarships/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            // Remove the rejected scholarship from the requested list
            setRequestedScholarships((prevScholarships) =>
                prevScholarships.filter((scholarship) => scholarship.id !== id)
            );
            Swal.fire('Rejected!', 'The scholarship has been rejected.', 'success');
        } catch (error) {
            console.error('Error rejecting scholarship:', error);
            Swal.fire('Error!', 'There was a problem rejecting the scholarship.', 'error');
        }
    };

    // Fetch requested scholarships on component mount
    useEffect(() => {
        fetchRequestedScholarships();
    }, []);

    return (
        <>
            <div className="requestedScholarships d-flex">
                <div className="d-flex mt-3 mb-2 justify-content-between border-bottom py-3">
                    <h1 className='ps-4 main-col test m-0'>Requested Scholarships</h1>
                </div>                <div className="table-container ps-3">
                    {loading ? (
                        <Loading />
                    ) : (
                        <table className="table table-hover bg-transparent">
                            <thead>
                                <tr className="bg-transparent">
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestedScholarships.length ? (
                                    requestedScholarships.map((scholarship, index) => (
                                        <tr key={scholarship.id}>
                                            <th scope="row">{++index}</th>
                                            <td>{scholarship.name}</td>
                                            <td>{scholarship.description}</td>
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
                                                                onClick={() => handleAccept(scholarship.id)}
                                                            >
                                                                Accept
                                                            </button>
                                                        </li>
                                                        <li className="d-flex justify-content-center align-items-center">
                                                            <button
                                                                className="dropdown-item text-danger"
                                                                onClick={() => handleReject(scholarship.id)}
                                                            >
                                                                Reject
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No Requested Scholarships</td>
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
