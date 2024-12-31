import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../Shared/Input/Input';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Shared/Loading/Loading'
import './EditScholarship.css'
import { addFeedback, editScholarship } from '../../../../Validation/validation';
import Swal from 'sweetalert2';
const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toISOString().split('T')[0]; // Extract "yyyy-MM-dd"
};
function EditScholarship() {
  const { id } = useParams();
  // console.log(id);
  const [scholarship, setScholarship] = useState(null);
  const navigate = useNavigate();
  //for pending scholarship!!!!
  const fetchScholarship = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/admin/scholarships/pending/${id}`);
      console.log('Fetched Scholarship:', response.data);
      setScholarship(response.data);
    } catch (error) {
      console.error('Error fetching Scholarship:', error);
    }
  };

  useEffect(() => {
    fetchScholarship();
  }, [id]);

  const onSubmit = async (updatedData) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this scholarship?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    });

    if (confirmResult.isConfirmed) {
      const uploadData = new FormData();
      for (const key in updatedData) {
        uploadData.append(key, updatedData[key]);
      }
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/v1/advertisers/scholarships/${id}/edit`,
          uploadData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success(`Scholarship updated Successfully`, {
          position: 'top-right',
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        formik.resetForm();
        setTimeout(() => {
          navigate('/advertiserDashboard/scholarship-advertiser');
        }, 1000);
      } catch (error) {
        console.error('Error updating scholarship:', error);
      }
    } else {
      Swal.fire('Cancelled', 'The scholarship update was cancelled.', 'info');
    }
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      id: id || '',
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
      website_link: '',
      key_personnel_details: '',
      number_of_seats_available: '',
      scholarship_picture: null,
    },
    validationSchema: editScholarship,
    onSubmit,
    enableReinitialize: true,
  });

  // Update Formik values when scholarship data is fetched
  useEffect(() => {
    if (scholarship) {
      console.log('Setting Formik values:', scholarship);
      formik.setValues({
        id: scholarship._id || '',
        scholarsip_name: scholarship.scholarsip_name || '',
        brief_descrition: scholarship.brief_descrition || '',
        start_Date: formatDate(scholarship.start_Date) || '',
        End_Date: formatDate(scholarship.End_Date) || '',
        SelectionProcess: scholarship.SelectionProcess || '',
        type: scholarship.type || '',
        language_Of_Study: scholarship.language_Of_Study || '',
        Place_of_Study: scholarship.Place_of_Study || '',
        expenses_coverd: scholarship.expenses_coverd || '',
        eligbility_criteria: scholarship.eligbility_criteria || '',
        term_and_conditions: scholarship.term_and_conditions || '',
        website_link: scholarship.website_link || '',
        key_personnel_details: scholarship.key_personnel_details || '',
        number_of_seats_available: scholarship.number_of_seats_available || '',
        scholarship_picture: scholarship.scholarship_picture || null,
      });
    }
  }, [scholarship, id]);
  const handleFileChange = (e) => {
    formik.setFieldValue('scholarship_picture', e.target.files[0]);
  };
  if (!scholarship) {
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
        <h2 className='ps-4 pt-4'>Edit Scholarship</h2>
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
            />
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="scholarsip_name">Scholarship Name</label>
            <input
              type="text"
              className={`form-control ${formik.touched.scholarsip_name && formik.errors.scholarsip_name ? 'is-invalid' : ''}`}
              id="scholarsip_name"
              name="scholarsip_name"
              value={formik.values.scholarsip_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.scholarsip_name && formik.errors.scholarsip_name ? (
              <div className="text-danger">{formik.errors.scholarsip_name}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="brief_descrition">Brief Description</label>
            <input
              type="text"
              className={`form-control ${formik.touched.brief_descrition && formik.errors.brief_descrition ? 'is-invalid' : ''}`}
              id="brief_descrition"
              name="brief_descrition"
              value={formik.values.brief_descrition}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.brief_descrition && formik.errors.brief_descrition ? (
              <div className="text-danger">{formik.errors.brief_descrition}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="start_Date">Start Date</label>
            <input
              type="date"
              className={`form-control ${formik.touched.start_Date && formik.errors.start_Date ? 'is-invalid' : ''}`}
              id="start_Date"
              name="start_Date"
              value={formik.values.start_Date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.start_Date && formik.errors.start_Date ? (
              <div className="text-danger">{formik.errors.start_Date}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="End_Date">End Date</label>
            <input
              type="date"
              className={`form-control ${formik.touched.End_Date && formik.errors.End_Date ? 'is-invalid' : ''}`}
              id="End_Date"
              name="End_Date"
              value={formik.values.End_Date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.End_Date && formik.errors.End_Date ? (
              <div className="text-danger">{formik.errors.End_Date}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="SelectionProcess">Selection Process</label>
            <input
              type="text"
              className={`form-control ${formik.touched.SelectionProcess && formik.errors.SelectionProcess ? 'is-invalid' : ''}`}
              id="SelectionProcess"
              name="SelectionProcess"
              value={formik.values.SelectionProcess}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.SelectionProcess && formik.errors.SelectionProcess ? (
              <div className="text-danger">{formik.errors.SelectionProcess}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="type">Type</label>
            <input
              type="text"
              className={`form-control ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.type && formik.errors.type ? (
              <div className="text-danger">{formik.errors.type}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="language_Of_Study">Language of Study</label>
            <input
              type="text"
              className={`form-control ${formik.touched.language_Of_Study && formik.errors.language_Of_Study ? 'is-invalid' : ''}`}
              id="language_Of_Study"
              name="language_Of_Study"
              value={formik.values.language_Of_Study}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.language_Of_Study && formik.errors.language_Of_Study ? (
              <div className="text-danger">{formik.errors.language_Of_Study}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="Place_of_Study">Place of Study</label>
            <input
              type="text"
              className={`form-control ${formik.touched.Place_of_Study && formik.errors.Place_of_Study ? 'is-invalid' : ''}`}
              id="Place_of_Study"
              name="Place_of_Study"
              value={formik.values.Place_of_Study}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Place_of_Study && formik.errors.Place_of_Study ? (
              <div className="text-danger">{formik.errors.Place_of_Study}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="expenses_coverd">Expenses Coverd</label>
            <input
              type="number"
              className={`form-control ${formik.touched.expenses_coverd && formik.errors.expenses_coverd ? 'is-invalid' : ''}`}
              id="expenses_coverd"
              name="expenses_coverd"
              value={formik.values.expenses_coverd}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expenses_coverd && formik.errors.expenses_coverd ? (
              <div className="text-danger">{formik.errors.expenses_coverd}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="eligbility_criteria">Eligbility Criteria</label>
            <input
              type="text"
              className={`form-control ${formik.touched.eligbility_criteria && formik.errors.eligbility_criteria ? 'is-invalid' : ''}`}
              id="eligbility_criteria"
              name="eligbility_criteria"
              value={formik.values.eligbility_criteria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.eligbility_criteria && formik.errors.eligbility_criteria ? (
              <div className="text-danger">{formik.errors.eligbility_criteria}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="term_and_conditions">Terms And Conditions</label>
            <input
              type="text"
              className={`form-control ${formik.touched.term_and_conditions && formik.errors.term_and_conditions ? 'is-invalid' : ''}`}
              id="term_and_conditions"
              name="term_and_conditions"
              value={formik.values.term_and_conditions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.term_and_conditions && formik.errors.term_and_conditions ? (
              <div className="text-danger">{formik.errors.term_and_conditions}</div>  // Display the error in red
            ) : null}
          </div>
          {/* <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="form_Link">Form Link</label>
            <input
              type="url"
              className={`form-control ${formik.touched.form_Link && formik.errors.form_Link ? 'is-invalid' : ''}`}
              id="form_Link"
              name="form_Link"
              value={formik.values.form_Link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.form_Link && formik.errors.form_Link ? (
              <div className="text-danger">{formik.errors.form_Link}</div>  // Display the error in red
            ) : null}
          </div> */}
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="website_link">Website Link</label>
            <input
              type="url"
              className={`form-control ${formik.touched.website_link && formik.errors.website_link ? 'is-invalid' : ''}`}
              id="website_link"
              name="website_link"
              value={formik.values.website_link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.website_link && formik.errors.website_link ? (
              <div className="text-danger">{formik.errors.website_link}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="key_personnel_details">Key Personnel Details</label>
            <input
              type="text"
              className={`form-control ${formik.touched.key_personnel_details && formik.errors.key_personnel_details ? 'is-invalid' : ''}`}
              id="key_personnel_details"
              name="key_personnel_details"
              value={formik.values.key_personnel_details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.key_personnel_details && formik.errors.key_personnel_details ? (
              <div className="text-danger">{formik.errors.key_personnel_details}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="number_of_seats_available">Number of Seats</label>
            <input
              type="number"
              className={`form-control ${formik.touched.number_of_seats_available && formik.errors.number_of_seats_available ? 'is-invalid' : ''}`}
              id="number_of_seats_available"
              name="number_of_seats_available"
              value={formik.values.number_of_seats_available}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.number_of_seats_available && formik.errors.number_of_seats_available ? (
              <div className="text-danger">{formik.errors.number_of_seats_available}</div>  // Display the error in red
            ) : null}
          </div>
          <div className="form-item col-md-5 my-3">
            <label className="form-label ps-2" htmlFor="scholarship_picture">Scholarship Picture</label>
            <input
              type="file"
              className={`form-control ${formik.touched.scholarship_picture && formik.errors.scholarship_picture ? 'is-invalid' : ''}`}
              id="scholarship_picture"
              name="scholarship_picture"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.scholarship_picture && formik.errors.scholarship_picture ? (
              <div className="text-danger">{formik.errors.scholarship_picture}</div>  // Display the error in red
            ) : null}
          </div>
          <hr style={{ color: '#fff' }} />
          <button
            className='btn edit-btn my-4 edit-btn-advertiser'
            type="submit"
            disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
          >
            Edit
          </button>
        </form>
      </div>
    </>
  )
}

export default EditScholarship