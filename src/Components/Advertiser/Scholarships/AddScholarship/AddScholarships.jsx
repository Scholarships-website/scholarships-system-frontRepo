import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import { UserContext } from '../../../../Context/UserContext';
import { addScholarship } from '../../../../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function AddScholarshipForm() {
  const { userToken, roleId } = useContext(UserContext);
  const [isRoleIdReady, setIsRoleIdReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = addScholarship;
  
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isRoleIdReady) {
        return;
      }
    
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this scholarship?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'Cancel',
      });
    
      if (confirmResult.isConfirmed) {
        try {
          setLoading(true);
          const uploadData = new FormData();
          for (const key in values) {
            uploadData.append(key, values[key]);
          }
    
          const response = await axios.post(
            `http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/create`,
            uploadData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
    
          toast.success('Scholarship created successfully!', {
            position: 'top-right',
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
    
          formik.resetForm(); // Reset form after success
    
          setTimeout(() => {
            navigate('/advertiserDashboard/scholarship-advertiser/pending');
          }, 2000);
        } catch (error) {
          console.error('Error creating scholarship:', error);
          const errorMessage =
            (error.response && error.response.data && error.response.data.message) ||
            'An error occurred while creating the scholarship.';
          toast.error(`Error: ${errorMessage}`, {
            position: 'bottom-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } finally {
          setLoading(false);
        }
      } else {
        Swal.fire('Cancelled', 'Scholarship creation was cancelled.', 'info');
      }
    },
  });

  useEffect(() => {
    if (roleId) {
      setIsRoleIdReady(true);
    } else {
      setIsRoleIdReady(false);
    }
  }, [roleId]);

  // Handle file input change
  const handleFileChange = (e) => {
    formik.setFieldValue('scholarship_picture', e.target.files[0]);
  };
  const customLabels = {
    scholarsip_name: 'Scholarship Name',
    brief_descrition: 'Brief Description',
    start_Date: 'Start Date',
    End_Date: 'End Date',
    SelectionProcess: 'Selection Process',
    type: 'Type of Scholarship',
    language_Of_Study: 'Language of Study',
    Place_of_Study: 'Place of Study',
    expenses_coverd: 'Expenses Covered',
    eligbility_criteria: 'Eligibility Criteria',
    term_and_conditions: 'Terms and Conditions',
    form_Link: 'Form Link',
    website_link: 'Website Link',
    key_personnel_details: 'Key Personnel Details',
    number_of_seats_available: 'Number of Seats Available',
    scholarship_picture: 'Upload Scholarship Image',
  };
  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="ps-4 pt-4 add-advertiser">Add Scholarship</h2>
      <form onSubmit={formik.handleSubmit} className="row justify-content-center align-items-center w-75 pt-5 gap-3 addForm" style={{ margin: 'auto' }}>
        {/* Render form fields dynamically */}
        {Object.keys(formik.values).map((key) => {
          if (key === 'scholarship_picture') {
            return (
              <div className="col-md-5" key={key}>
                <label htmlFor={key} className="form-label">
                  {customLabels[key]}
                </label>
                <input
                  type="file"
                  className={`form-control ${formik.touched[key] && formik.errors[key] ? 'is-invalid' : ''}`}
                  id={key}
                  name={key}
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[key] && formik.errors[key] && (
                  <div className="text-danger">{formik.errors[key]}</div>
                )}
              </div>
            );
          }

          return (
            <div className="col-md-5" key={key}>
              <label htmlFor={key} className="form-label">
                {customLabels[key] || key.replace(/_/g, ' ')}
              </label>
              <input
                type={key.includes('Date') ? 'date' : 'text'}
                className={`form-control ${formik.touched[key] && formik.errors[key] ? 'is-invalid' : ''}`}
                id={key}
                name={key}
                value={formik.values[key]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[key] && formik.errors[key] && (
                <div className="text-danger">{formik.errors[key]}</div>
              )}
            </div>
          );
        })}
        {/* Submit button */}
        <div className="row justify-content-center align-items-center addAdvertiser">
          <button type="submit" className="w-auto addButton btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddScholarshipForm;
