import React, { useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Feedbacks() {
    let [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeedbacks = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/v1/website/feedbacks`);
            console.log(data)
            setFeedbacks(data);
            setLoading(false)
        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }
    };
    const deleteFeedback = async (id) => {
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
                    await axios.delete(`http://localhost:3000/api/v1/scholarships/feedbacks/${id}`);
                    // Remove the deleted Feedback
                    setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Feedback has been deleted.",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Error deleting Feedback:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was a problem deleting the Feedback.",
                        icon: "error",
                    });
                }
            }
        });
    };
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    // const filteredFeedbacks = feedbacks.filter((feedback) => {
    //     return (
    //         feedback.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         feedback.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // });
    return (
        <>
            <div className="student-admin">
                <div className=" mt-3 mb-2 justify-content-between border-bottom py-3">
                    <h1 className='ps-4 main-col'>Feedbacks on the Website</h1>
                </div>
                <div className="table-container ps-3">
                    {loading ? (
                        <Loading />
                    ) : (
                        <table className="table table-hover bg-transparent ">
                            <thead>
                                <tr className='bg-transparent '>
                                    <th scope="col">#</th>
                                    <th scope="col">First name</th>
                                    <th scope="col">Last name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.length ? (feedbacks.map((feedback, index) => {
                                    return (
                                        <tr key={feedback.id}>
                                            <th scope="row">{++index}</th>
                                            <td>{feedback.first_name}</td>
                                            <td>{feedback.last_name}</td>
                                            <td>{feedback.email}</td>
                                            <td>{feedback.phoneNumber}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li className='d-flex justify-content-center align-items-center'>
                                                            <button className="dropdown-item text-danger" onClick={() => deleteFeedback(feedback.id)}>
                                                                <FontAwesomeIcon icon={faUserXmark} className='px-1' />
                                                                Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })) : <tr>
                                    <td colSpan="7">No Feedbacks</td>
                                </tr>}
                            </tbody>
                        </table>)}
                </div>
            </div>
        </>
    )
}
