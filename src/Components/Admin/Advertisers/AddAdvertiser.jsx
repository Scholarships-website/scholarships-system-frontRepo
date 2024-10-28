import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../../Shared/Input/Input';
import { addAdvertiser } from '../../../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';
import './Advertiser.css'
import PhoneInput from '../../Shared/Input/PhoneInput';

export default function AddAdvertiser() {
  let { userToken, setUserToken } = useContext(UserContext);
  // let {userToken,setUserToken,userId , setUserId,userData,setUserData} = useContext(UserContext);
  const initialValues = {
    username: '',
    email: '',
    password: '',
    organization_name: '',
    phoneNumber: '',
    countryCode: '+970', // Default country code
  };
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('organization_name', values.organization_name);
      formData.append('phoneNumber', `${values.countryCode}${values.phoneNumber}`);
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/advertisers/register`,
        formData, // Sending the users object directly
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );
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
      setTimeout(() => {
        navigate('/dashboard/advertisers')
      }, 2000);
    }
    catch (error) {
      console.error('Error submitting form:', error);
      console.log('Error response:', error.response);
      toast.error('add advertiser failed: ' + error.response.data, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
      id: 'username',
      name: 'username',
      title: 'Username',
      value: formik.values.username,
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      title: 'Email',
      value: formik.values.email,
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      title: 'User Password',
      value: formik.values.password,
    },
    {
      type: 'text',
      id: 'organization_name',
      name: 'organization_name',
      title: 'Organization Name',
      value: formik.values.organization_name,
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
      colSize="col-md-6"
    />
  )
  return (
    <>
      <div className="add-container">
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
        <h2 className='ps-4 pt-4 add-advertiser'>Add Advertiser</h2>
        <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 p-5 pt-5 gap-3 addForm " style={{ margin: 'auto' }}>
          {renderInputs}
          <div className="col-md-6">
            <PhoneInput className="phoneInput row justify-content-center align-items-center w-75 p-5 pt-5 gap-3"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
              countryCode={formik.values.countryCode} // Pass the country code to the PhoneInput
            />
          </div>
          <div className="row justify-content-center align-items-center addAdvertiser">
            <button className='w-auto addButton btn' type="submit"
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}>Add
            </button>
          </div>
        </form >
      </div>

    </>
  )
}