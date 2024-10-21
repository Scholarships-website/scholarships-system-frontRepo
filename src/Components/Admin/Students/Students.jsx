import React, { useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Students() {
  let [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(`https://localhost:7107/api/Students`);
      console.log(data)
      setStudents(data.data);
      setLoading(false)
    }
    catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  const deletetStudent = async (id) => {
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
          await axios.delete(`https://localhost:7107/api/Student/${id}`);
          // Remove the deleted Student from the students array
          setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Student has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting student:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the student.",
            icon: "error",
          });
        }
      }
    });
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <div className="student-admin">
        <div className=" mt-3 mb-2 justify-content-between border-bottom py-3">
          <h1 className='ps-4 main-col'>Students</h1>
          <form className="me-3 search-admin" role="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#418447",}} />
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
            <Loading />
          ) : (
            <table className="table table-hover bg-transparent ">
              <thead>
                <tr className='bg-transparent '>
                  <th scope="col">#</th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length ? (filteredStudents.map((student, index) => {
                  return (
                    <tr key={student.id}>
                      <th scope="row">{++index}</th>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.email}</td>
                      <td>
                        <div className="dropdown">
                          <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </button>
                          <ul className="dropdown-menu">
                            <li className='d-flex justify-content-center align-items-center'>
                              <button className="dropdown-item text-danger" onClick={() => deletetStudent(student.id)}>
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
                  <td colSpan="7">No Students</td>
                </tr>}
              </tbody>
            </table>)}
        </div>
      </div>
    </>
  )
}
