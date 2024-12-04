import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Shared/Input/Input';
import { editAdvertiser } from '../../../Validation/validation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading'

export default function EditAdvertiser() {
  const { id } = useParams();
  console.log(id);
  const [advertiser, setAdvertiser] = useState(null);
  const navigate = useNavigate();

  // Fetch advertiser data from the API
  const fetchAdvertiser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/advertisers/${id}`);
      console.log('Fetched Advertiser:', response.data);
      setAdvertiser(response.data);
    } catch (error) {
      console.error('Error fetching advertiser:', error);
    }
  };

  useEffect(() => {
    fetchAdvertiser();
  }, [id]);

  const onSubmit = async (updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/admin/advertisers/edit/${id}`,
        {
          id: updatedData.id,
          username: updatedData.username,
          email: updatedData.email,
          organization_name: updatedData.organization_name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(`Advertiser updated Successfully`, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate('/dashboard/advertisers')
      }, 2000);
    } catch (error) {
      console.error('Error updating advertiser:', error);
    }
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: id || '',
      username: '',
      email: '',
      organization_name: '',
    },
    validationSchema: editAdvertiser,
    onSubmit,
    enableReinitialize: true,
  });

  // Update Formik values when advertiser data is fetched
  useEffect(() => {
    if (advertiser) {
      console.log('Setting Formik values:', advertiser);
      formik.setValues({
        id: advertiser._id || '',
        username: advertiser.user_id.username || '',
        email: advertiser.user_id.email || '',
        organization_name: advertiser.organization_name || '',
      });
    }
  }, [advertiser, id]);

  if (!advertiser) {
    return <Loading />;
  }
  return (
    <>
      <div className="edit-adv">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <h2 className='ps-4 pt-4'>Edit Advertiser Account "{advertiser.user_id.username}"</h2>
        <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5">
          <div className="form-item col-md-5">
            <label className="form-label ps-2" htmlFor="id">ID</label>
            <input
              type="text"
              className="form-control "
              id="id"
              name="id"
              value={formik.values.id}  // Bind to Formik values
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              disabled
              colSize="col-md-5"
            />
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="username">Username</label>
            <input
              type="text"
              className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="organization_name">Organization Name</label>
            <input
              type="text"
              className={`form-control ${formik.touched.organization_name && formik.errors.organization_name ? 'is-invalid' : ''}`}
              id="organization_name"
              name="organization_name"
              value={formik.values.organization_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.organization_name && formik.errors.organization_name ? (
              <div className="text-danger">{formik.errors.organization_name}</div>  // Display the error in red
            ) : null}
          </div>
          <hr style={{color:'#fff'}}/>
          <button
            className='w-auto btn edit-btn my-4 edit-btn-advertiser'
            type="submit"
            disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
}
