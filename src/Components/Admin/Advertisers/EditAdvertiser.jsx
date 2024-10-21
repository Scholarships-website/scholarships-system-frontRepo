import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Shared/Input/Input';
import { editAdvertiser } from '../../../Validation/validation';

export default function EditAdvertiser() {
  const { id } = useParams();
  const [advertiser, setAdvertiser] = useState(null);
  const navigate = useNavigate();

  // Fetch advertiser data from the API
  const fetchAdvertiser = async () => {
    try {
      const response = await axios.get(`https://localhost:7107/api/Advertiser/${id}`);
      console.log('Fetched Advertiser:', response.data.data);
      setAdvertiser(response.data.data);
    } catch (error) {
      console.error('Error fetching advertiser:', error);
    }
  };

  useEffect(() => {
    fetchAdvertiser();
  }, [id]);

  const onSubmit = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://localhost:7107/api/Advertiser/${id}`,
        {
          id: updatedData.id,
          name: updatedData.name,
          email: updatedData.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.succeeded) {
        navigate('/dashboard/advertiser');
      }
    } catch (error) {
      console.error('Error updating advertiser:', error);
    }
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: id || '',
      name: '',
      email: '',
    },
    validationSchema: editAdvertiser,
    onSubmit,
    enableReinitialize: true,  // Allow form to reinitialize when advertiser data changes
  });

  // Update Formik values when advertiser data is fetched
  useEffect(() => {
    if (trainer) {
      console.log('Setting Formik values:', advertiser); // Log the advertiser data being set
      formik.setValues({
        id: advertiser.id || '',
        name: advertiser.name || '',
        email: advertiser.email || '',
      });
    }
  }, [advertiser, id]);  // Run this effect whenever trainer data or id changes

  // Show loading state until the trainer data is fetched
  if (!advertiser) {
    return <div>Loading...</div>;  // Display loading message
  }
  return (
    <>
      <h2 className='ps-4 pt-4'>Edit Advertiser Account "{advertiser.name}"</h2>
      <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 ps-4 pt-5">
        <div className="form-item col-md-6">
          <label className="form-label ps-2" htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control mb-4"
            id="id"
            name="id"
            value={formik.values.id}  // Bind to Formik values
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors}
            disabled
          />
        </div>
        <div className="form-item col-md-6">
          <label className="form-label ps-2" htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>  // Display the error in red
          ) : null}
        </div>
        <div className="form-item col-md-6">
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
        <button
          className='w-auto btn btn-outline-warning mt-4'
          type="submit"
          disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
        >
          Edit
        </button>
      </form>
    </>
  );
}
