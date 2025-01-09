import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Identifiers = ({ currentStep, totalSteps, prevStep, formData, setFormData, saveStepData, nextStep,applicationDetails }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    identifier_Name1: Yup.string().required("Identifier's Name is required"),
    identifier_phone1: Yup.string().required("Identifier's Phone is required"),
    identifier_profession1: Yup.string().required("Profession is required"),

    identifier_Name2: Yup.string().required("Identifier's Name is required"),
    identifier_phone2: Yup.string().required("Identifier's Phone is required"),

    identifier_profession2: Yup.string().required("Profession is required"),

    identifier_Name3: Yup.string().required("Identifier's Name is required"),
    identifier_phone3: Yup.string().required("Identifier's Phone is required"),

    identifier_profession3: Yup.string().required("Profession is required"),
  });

  // Initial Values: Assign values individually for each identifier field
  const initialValues = {
    identifier_Name1: applicationDetails?.identifier_Name[0] || formData?.identifier_Name1 || "",
    identifier_phone1: applicationDetails?.identifier_Phone[0] || formData?.identifier_phone1 || "",
    identifier_profession1: applicationDetails?.identifier_profession[0] || formData?.identifier_profession1 || "",

    identifier_Name2: applicationDetails?.identifier_Name[1] || formData?.identifier_Name2 || "",
    identifier_phone2: applicationDetails?.identifier_Phone[1] || formData?.identifier_phone2 || "",
    identifier_profession2: applicationDetails?.identifier_profession[1] || formData?.identifier_profession2 || "",

    identifier_Name3: applicationDetails?.identifier_Name[2] || formData?.identifier_Name3 || "",
    identifier_phone3: applicationDetails?.identifier_Phone[1] || formData?.identifier_phone3 || "",
    identifier_profession3: applicationDetails?.identifier_profession[2] || formData?.identifier_profession3 || "",
  };

  // Submit Handler
  const handleSubmit = (values) => {
    // Structure the form data to match your previous approach
    // const identifiers = [
    //   { name: values.identifier_Name1, phone: values.identifier_phone1, profession: values.identifier_profession1 },
    //   { name: values.identifier_Name2, phone: values.identifier_phone2, profession: values.identifier_profession2 },
    //   { name: values.identifier_Name3, phone: values.identifier_phone3, profession: values.identifier_profession3 },
    // ];
    console.log("Submitting form...");
    console.log(values);
    saveStepData({ stepKey: 'identifiers', data: values });

    setFormData((prev) => ({
      ...prev,
      identifiers: values,
    }));
    nextStep();

  };

  return (
    <div className="container mt-5">
      <Formik
        initialValues={formData.identifiers || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {/* Identifier 1 */}
          <div className="mb-4 p-3 border rounded">
            <h5>Identifier 1</h5>
            {/* Name */}
            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_Name1">Identifier's Name</label>
                <Field
                  type="text"
                  name="identifier_Name1"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_Name1"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Phone */}
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_phone1">Phone/Mobile Number</label>
                <Field
                  type="text"
                  name="identifier_phone1"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_phone1"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Profession */}
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_profession1">Profession</label>
                <Field
                  type="text"
                  name="identifier_profession1"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_profession1"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
          </div>

          {/* Identifier 2 */}
          <div className="mb-4 p-3 border rounded">
            <h5>Identifier 2</h5>
            {/* Name */}
            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_Name2">Identifier's Name</label>
                <Field
                  type="text"
                  name="identifier_Name2"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_Name2"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Phone */}
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_phone2">Phone/Mobile Number</label>
                <Field
                  type="text"
                  name="identifier_phone2"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_phone2"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Profession */}
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_profession2">Profession</label>
                <Field
                  type="text"
                  name="identifier_profession2"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_profession2"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
          </div>

          {/* Identifier 3 */}
          <div className="mb-4 p-3 border rounded">
            <h5>Identifier 3</h5>
            {/* Name */}
            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_Name3">Identifier's Name</label>
                <Field
                  type="text"
                  name="identifier_Name3"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_Name3"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Phone */}
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_phone3">Phone/Mobile Number</label>
                <Field
                  type="text"
                  name="identifier_phone3"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_phone3"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Profession */}
              <div className="mb-3 col-md-4">
                <label htmlFor="identifier_profession3">Profession</label>
                <Field
                  type="text"
                  name="identifier_profession3"
                  className="form-control"
                />
                <ErrorMessage
                  name="identifier_profession3"
                  component="div"
                  className="text-danger"
                />
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
      </Formik>
    </div>
  );
};

export default Identifiers;
