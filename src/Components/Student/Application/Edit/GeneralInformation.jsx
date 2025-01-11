import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../../../Context/UserContext";
import moment from "moment/moment";
import PropTypes from "prop-types";
import { Box, CircularProgress } from "@mui/material";
import Loading from "../../../Shared/Loading/Loading";

const GeneralInformation = ({ currentStep, totalSteps, prevStep, formData, setFormData, saveStepData, nextStep, applicationDetails }) => {
  const { studentData, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Loading state
  const [formValues, setFormValues] = useState({
    fullname:studentData.fullname|| "",
    birthdate:studentData.birthdate|| "",
    Gender:studentData.Gender|| "",
  });
  useEffect(() => {
    if (studentData) {
      setFormValues({
        fullname: studentData.fullname || "",
        birthdate: studentData.birthdate ? moment(studentData.birthdate).format('YYYY-MM-DD') : "",
        Gender: studentData.gender || "",
      });
      setLoading(false)
    }
  }, [studentData]);
  const initialValues = {
    ID_Number: formData.ID_Number ?? "",
    Card_Type: formData.Card_Type ?? "",
    Martial_Status: formData.Martial_Status ?? "",
    Permanent_Residence: formData.Permanent_Residence ?? "",
    province: formData.province ?? "",
    street: formData.street ?? "",
    phoneNumber: userData?.phoneNumber ?? "",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  // Validation Schema
  const validationSchema = Yup.object().shape({
    ID_Number: Yup.string()
      .matches(/^\d{9}$/, "ID Number must be exactly 9 digits")
      .required("ID Number is required"),

    Card_Type: Yup.string()
      .required("Card Type is required"),

    Martial_Status: Yup.string()
      .required("Marital Status is required"),

    Permanent_Residence: Yup.string()
      .min(3, "Permanent Residence must be at least 3 characters")
      .max(50, "Permanent Residence cannot exceed 50 characters")
      .required("Permanent Residence is required"),

    province: Yup.string()
      .min(2, "Province must be at least 2 characters")
      .max(30, "Province cannot exceed 30 characters")
      .required("Province is required"),

    street: Yup.string()
      .min(2, "Street must be at least 2 characters")
      .max(50, "Street cannot exceed 50 characters")
      .required("Street is required"),

    phoneNumber: Yup.string()
      .required("Phone Number is required"),
  });
  // Submit Handler
  const handleSubmit = (values) => {
    console.log("Submitting form...");
    console.log(values);
    saveStepData({ stepKey: 'generalInfo', data: values });
    setFormData((prev) => ({
      ...prev,
      generalInfo: values,
    }));
    nextStep();
  };
  return (
    loading ? ( <Loading/>
  ) : (
    <Formik
    initialValues={formData.generalInfo || initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    enableReinitialize={true}  // Allow re-initialization of form values on studentData changeenableReinitialize={true}  // Allow re-initialization of form values on studentData change
  >
    {({ values }) => (
      <Form>
        {/* Group 1: Personal Information */}
        <div className="input-group mb-4">
          <h3 className="mt-5">Personal Information</h3>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="fullname">Full Name <span className="text-danger"> * </span> </label>
              <Field type="text" name="fullname" id="fullname" className="form-control" value={formValues.fullname} readOnly />
              <ErrorMessage name="fullname" component="div" className="text-danger" />
            </div>
            <div className="col-md-5 mb-3">
              <label htmlFor="ID_Number">ID Number <span className="text-danger"> * </span></label>
              <Field type="text" name="ID_Number" id="ID_Number" className="form-control" />
              <ErrorMessage name="ID_Number" component="div" className="text-danger" />
            </div>

            <div className="col-md-5 mb-3">
              <label htmlFor="Card_Type">Card Type <span className="text-danger"> * </span></label>
              <Field as="select" name="Card_Type" id="Card_Type" className="form-control">
                <option value="">-- Select --</option>
                <option value="هوية فلسطينية">هوية فلسطينية</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="Card_Type" component="div" className="text-danger" />
            </div>
            <div className="col-md-5 mb-3">
              <label htmlFor="dob">Date of Birth <span className="text-danger"> * </span></label>
              <Field type="date" name="dob" id="dob" className="form-control" value={formValues.birthdate} readOnly />
              <ErrorMessage name="dob" component="div" className="text-danger" />
            </div>
            <div className="col-md-5 mb-3">
              <label htmlFor="gender">Gender <span className="text-danger"> * </span></label>
              <Field as="select" name="gender" id="gender" className="form-control" value={formValues.Gender} // Set the selected value here
                onChange={handleChange}>
                <option value="">-- Select --</option>
                <option value="Male" >Male</option>
                <option value="female" >Female</option>
                <option value="Other" >Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-danger" />
            </div>
            <div className="col-md-5 mb-3">
              <label htmlFor="Martial_Status">Marital Status <span className="text-danger"> * </span></label>
              <Field as="select" name="Martial_Status" id="Martial_Status" className="form-control">
                <option value="">-- Select --</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="Martial_Status" component="div" className="text-danger" />
            </div>
          </div>
        </div>
        {/* Group 3: Address Information */}
        <div className="input-group mb-4">
          <h3>Address Information</h3>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="Permanent_Residence">Permanent Residence <span className="text-danger"> * </span></label>
              <Field type="text" name="Permanent_Residence" id="Permanent_Residence" className="form-control" />
              <ErrorMessage name="Permanent_Residence" component="div" className="text-danger" />
            </div>

            <div className="col-md-5 mb-3">
              <label htmlFor="province">The Province <span className="text-danger"> * </span></label>
              <Field type="text" name="province" id="province" className="form-control" />
              <ErrorMessage name="province" component="div" className="text-danger" />
            </div>

            <div className="col-md-5 mb-3">
              <label htmlFor="street">Street <span className="text-danger"> * </span></label>
              <Field type="text" name="street" id="street" className="form-control" />
              <ErrorMessage name="street" component="div" className="text-danger" />
            </div>
          </div>
        </div>

        {/* Group 4: Contact Information */}
        <div className="input-group mb-4">
          <h3>Contact Information</h3>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="phoneNumber">Phone Number <span className="text-danger"> * </span></label>
              <Field type="text" name="phoneNumber" id="phoneNumber" className="form-control" readOnly />
              <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="text-end step-navigation">
          <button
            type="button"
            className="prev-btn btn mt-4 "
            style={{ backgroundColor: '#5a6268' }}
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button type="submit" className="btn btn-primary mt-4">
            Save and Continue
          </button>
        </div>
      </Form>
    )}
  </Formik>
  ));
};

export default GeneralInformation;
