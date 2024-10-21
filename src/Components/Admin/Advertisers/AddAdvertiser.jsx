import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../../Shared/Input/Input';
import { addAdvertiser } from '../../../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';
import './Advertiser.css'

export default function AddAdvertiser() {
  let { userToken, setUserToken } = useContext(UserContext);
  // let {userToken,setUserToken,userId , setUserId,userData,setUserData} = useContext(UserContext);
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      const { data } = await axios.post(
        `https://localhost:7107/api/Auth/register/advertiser`,
        formData, // Sending the users object directly
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );
      if (data.succeeded) {
        formik.resetForm();
        toast.success(`Advertiser Added Successfully`, {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/dashboard/advertisers')
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Error response:', error.response);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema: addAdvertiser
  })
  const inputs = [
    {
      type: 'text',
      id: 'name',
      name: 'name',
      title: 'Name',
      value: formik.values.name,
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      title: 'User Email',
      value: formik.values.email,
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      title: 'User Password',
      value: formik.values.password,
    },
  ]
  const renderInputs = inputs.map((input, index) =>
    <Input type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  )
  return (
    <>
      <h2 className='ps-4 pt-4'>Add Advertiser</h2>
      <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 p-5 pt-5 gap-3  ">
        {renderInputs}
        <div className="row justify-content-center align-items-center addAdvertiser">
          <button className='w-auto addButton btn' type="submit"
            disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}>Add
          </button>
        </div>
      </form>
    </>
  )
}