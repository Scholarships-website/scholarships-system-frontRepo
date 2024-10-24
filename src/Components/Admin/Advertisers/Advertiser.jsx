import React, { useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Advertiser() {
  const [advertisers, setAdvertiser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdvertisers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/advertisers/`);
      console.log(data);
      setAdvertiser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteAdvertiser = async (id) => {
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
          await axios.delete(`http://localhost:3000/api/v1/advertisers/${id}`);
          setAdvertiser((prevAdvertiser) => prevAdvertiser.filter((advertiser) => advertiser.id !== id));
          Swal.fire("Deleted!", "The advertiser has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting advertiser:", error);
          Swal.fire("Error!", "There was a problem deleting the advertiser.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchAdvertisers();
  }, []);

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredAdvertiser = advertisers.filter((advertiser) => {
  //   return (
  //     advertiser.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     advertiser.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     advertiser.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  return (
    <>
      <div className="advertiser-admin">
        <div className=" mt-3 mb-2 justify-content-between border-bottom py-3">
          <h1 className='ps-4 main-col'>Advertisers</h1>
          {/* <form className="me-3 search-admin" role="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#418447",}} />
            <input
              className="form-control me-5"
              type="search"
              placeholder="Search by name/email"
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
                <tr className='bg-transparent '>
                  <th scope="col">#</th>
                  <th scope="col">Advertiser Name</th>
                  <th scope="col">Organization Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {advertisers.length ? (
                  advertisers.map((advertiser, index) => {
                    return (
                      <tr key={advertiser._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{advertiser.user_id.username}</td>
                        <td>{advertiser.organization_name}</td>
                        <td>{advertiser.user_id.email}</td>
                        <td>{advertiser.user_id.phoneNumber}</td>
                        <td>
                          <div className="dropdown">
                            <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            <ul className="dropdown-menu">
                              <li className='d-flex justify-content-center align-items-center'>
                                <Link className="dropdown-item text-warning" to={`/dashboard/editAdvertiser/${advertiser._id}`}>
                                  <FontAwesomeIcon icon={faPenToSquare} className='px-1' />Update
                                </Link>
                              </li>
                              <li className='d-flex justify-content-center align-items-center'>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => deleteAdvertiser(advertiser._id)}
                                >
                                  <FontAwesomeIcon icon={faUserXmark} className='px-1' />Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7">No Advertisers</td>
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
