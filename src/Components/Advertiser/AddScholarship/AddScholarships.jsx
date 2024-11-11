import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../../Shared/Input/Input';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';

function AddScholarships() {
  let { userToken, roleId } = useContext(UserContext);
  const [isRoleIdReady, setIsRoleIdReady] = useState(false); 

  const initialValues = {
    scholarsip_name: '',
    brief_descrition: '',
    start_Date: '',
    End_Date: '',
    SelectionProcess: '',
    type: '',
    language_Of_Study: '',
    Place_of_Study: '',
    expenses_coverd: '',
    eligbility_criteria: '',
    term_and_conditions: '',
    form_Link: '',
    website_link: '',
    key_personnel_details: '',
    number_of_seats_available: '',
    scholarship_picture: null,
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (roleId) {
      setIsRoleIdReady(true);
    } else {
      setIsRoleIdReady(false);
    }
  }, [roleId]);
  const onSubmit = async (values) => {
    if (!isRoleIdReady) {
      return; // Don't send request if roleId is not ready
    }
    try {
      const formData = new FormData();
      formData.append('scholarsip_name', values.scholarsip_name);
      formData.append('brief_descrition', values.brief_descrition);
      formData.append('start_Date', values.start_Date);
      formData.append('end_Date', values.end_Date);
      formData.append('selectionProcess', values.SelectionProcess);
      formData.append('type', values.type);
      formData.append('language_Of_Study', values.language_Of_Study);
      formData.append('Place_of_Study', values.Place_of_Study);
      formData.append('expenses_coverd', values.expenses_coverd);
      formData.append('eligbility_criteria', values.eligbility_criteria);
      formData.append('term_and_conditions', values.term_and_conditions);
      formData.append('form_Link', values.form_Link);
      formData.append('website_link', values.website_link);
      formData.append('key_personnel_details', values.key_personnel_details);
      formData.append('number_of_seats_available', values.number_of_seats_available);
      formData.append('scholarship_picture', values.scholarship_picture);
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/create`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );
      formik.resetForm();
      toast.success(`Scholarship Added Successfully`, {
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
        navigate('/advertiserDashboard/scholarship-advertiser/pending')
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
    validationSchema: null
  })
  const inputs = [
    {
      type: 'text',
      id: 'scholarsip_name',
      name: 'scholarsip_name',
      title: 'Scholarship Name',
      value: formik.values.scholarsip_name,
    },
    {
      type: 'text',
      id: 'brief_descrition',
      name: 'brief_descrition',
      title: 'Brief Description',
      value: formik.values.brief_descrition,
    },
    {
      type: 'date',
      id: 'start_Date',
      name: 'start_Date',
      title: 'Start Date',
      value: formik.values.start_Date,
    },
    {
      type: 'date',
      id: 'End_Date',
      name: 'End_Date',
      title: 'End Date',
      value: formik.values.End_Date,
    },
    {
      type: 'text',
      id: 'SelectionProcess',
      name: 'SelectionProcess',
      title: 'Selection Process',
      value: formik.values.SelectionProcess,
    },
    {
      type: 'text',
      id: 'type',
      name: 'type',
      title: 'Type',
      value: formik.values.type,
    },
    {
      type: 'text',
      id: 'language_Of_Study',
      name: 'language_Of_Study',
      title: 'Language of Study',
      value: formik.values.language_Of_Study,
    },
    {
      type: 'text',
      id: 'Place_of_Study',
      name: 'Place_of_Study',
      title: 'Place of Study',
      value: formik.values.Place_of_Study,
    },
    {
      type: 'number',
      id: 'expenses_coverd',
      name: 'expenses_coverd',
      title: 'Expenses Coverd',
      value: formik.values.expenses_coverd,
    },
    {
      type: 'text',
      id: 'eligbility_criteria',
      name: 'eligbility_criteria',
      title: 'Eligbility Criteria',
      value: formik.values.eligbility_criteria,
    },
    {
      type: 'text',
      id: 'term_and_conditions',
      name: 'term_and_conditions',
      title: 'Term And Conditions',
      value: formik.values.term_and_conditions,
    },
    {
      type: 'text',
      id: 'form_Link',
      name: 'form_Link',
      title: 'Form Link',
      value: formik.values.form_Link,
    },
    {
      type: 'text',
      id: 'website_link',
      name: 'website_link',
      title: 'Website Link',
      value: formik.values.website_link,
    },
    {
      type: 'text',
      id: 'key_personnel_details',
      name: 'key_personnel_details',
      title: 'Key Personnel Details',
      value: formik.values.key_personnel_details,
    },
    {
      type: 'number',
      id: 'number_of_seats_available',
      name: 'number_of_seats_available',
      title: 'Number of Seats Available',
      value: formik.values.number_of_seats_available,
    },
    {
      type: 'file',
      id: 'scholarship_picture',
      name: 'scholarship_picture',
      title: 'Scholarship Picture',
      value: formik.values.scholarship_picture,
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
        <h2 className='ps-4 pt-4 add-advertiser'>Post Scholarship</h2>
        <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 pt-5 gap-3 addForm " style={{ margin: 'auto' }}>
          {renderInputs}
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

export default AddScholarships