import React, { useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
// import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function ReportedComments() {
    let [reportedComments, setReportedComments] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const fetchReportedComments = async () => {
    //     try {
    //         const { data } = await axios.get(`http://localhost:3000/api/v1/feedbacks/`);
    //         console.log(data)
    //         setReportedComments(data);
    //         setLoading(false)
    //     }
    //     catch (error) {
    //         console.log(error);
    //         setLoading(false)
    //     }
    // };
    // const deleteReportedComment = async (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!",
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 await axios.delete(`http://localhost:3000/api/v1/feedback/${id}`);
    //                 // Remove the deleted comment
    //                 setReportedComments((prevReportedComments) => ReportedComments.filter((reportedComment) => reportedComments.id !== id));
    //                 Swal.fire({
    //                     title: "Deleted!",
    //                     text: "comment has been deleted.",
    //                     icon: "success",
    //                 });
    //             } catch (error) {
    //                 console.error("Error deleting comment:", error);
    //                 Swal.fire({
    //                     title: "Error!",
    //                     text: "There was a problem deleting the comment.",
    //                     icon: "error",
    //                 });
    //             }
    //         }
    //     });
    // };
    // useEffect(() => {
    //     fetchReportedComments();
    // }, []);


    return (
        <>
            <div className="student-admin">
                <div className=" mt-3 mb-2 justify-content-between border-bottom py-3">
                    <h2 className='ps-4 main-col'>Reported Comments</h2>
                </div>
                {/* <div className="table-container ps-3">
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
                                {reportedComments.length ? (reportedComments.map((comment, index) => {
                                    return (
                                        <tr key={comment.id}>
                                            <th scope="row">{++index}</th>
                                            <td>{comment.first_name}</td>
                                            <td>{comment.last_name}</td>
                                            <td>{comment.email}</td>
                                            <td>{comment.phoneNumber}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li className='d-flex justify-content-center align-items-center'>
                                                            <button className="dropdown-item text-danger" onClick={() => deleteReportedComment(comment.id)}>
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
                                    <td colSpan="7">No Reported Comments</td>
                                </tr>}
                            </tbody>
                        </table>)}
                </div> */}
            </div>
        </>
    )
}
