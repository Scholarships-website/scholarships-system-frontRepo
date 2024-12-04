import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Identifiers = ({ formData, setFormData }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    name1: Yup.string().required("Identifier's Name is required"),
    phone1: Yup.string()
      .required("Phone/Mobile Number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(8, "Phone number must be at least 8 digits"),
    profession1: Yup.string().required("Profession is required"),

    name2: Yup.string().required("Identifier's Name is required"),
    phone2: Yup.string()
      .required("Phone/Mobile Number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(8, "Phone number must be at least 8 digits"),
    profession2: Yup.string().required("Profession is required"),

    name3: Yup.string().required("Identifier's Name is required"),
    phone3: Yup.string()
      .required("Phone/Mobile Number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(8, "Phone number must be at least 8 digits"),
    profession3: Yup.string().required("Profession is required"),
  });

  // Initial Values: Assign values individually for each identifier field
  const initialValues = {
    name1: formData?.identifiers?.[0]?.name || "",
    phone1: formData?.identifiers?.[0]?.phone || "",
    profession1: formData?.identifiers?.[0]?.profession || "",

    name2: formData?.identifiers?.[1]?.name || "",
    phone2: formData?.identifiers?.[1]?.phone || "",
    profession2: formData?.identifiers?.[1]?.profession || "",

    name3: formData?.identifiers?.[2]?.name || "",
    phone3: formData?.identifiers?.[2]?.phone || "",
    profession3: formData?.identifiers?.[2]?.profession || "",
  };

  // Submit Handler
  const handleSubmit = (values) => {
    // Structure the form data to match your previous approach
    const identifiers = [
      { name: values.name1, phone: values.phone1, profession: values.profession1 },
      { name: values.name2, phone: values.phone2, profession: values.profession2 },
      { name: values.name3, phone: values.phone3, profession: values.profession3 },
    ];

    setFormData((prev) => ({
      ...prev,
      identifiers,
    }));
  };

  return (
    <div className="container mt-5">
      <Formik
        initialValues={initialValues}
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
                <label htmlFor="name1">Identifier's Name</label>
                <Field
                  type="text"
                  name="name1"
                  className="form-control"
                />
                <ErrorMessage
                  name="name1"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Phone */}
              <div className="mb-3 col-md-4">
                <label htmlFor="phone1">Phone/Mobile Number</label>
                <Field
                  type="text"
                  name="phone1"
                  className="form-control"
                />
                <ErrorMessage
                  name="phone1"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Profession */}
              <div className="mb-3 col-md-4">
                <label htmlFor="profession1">Profession</label>
                <Field
                  type="text"
                  name="profession1"
                  className="form-control"
                />
                <ErrorMessage
                  name="profession1"
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
                <label htmlFor="name2">Identifier's Name</label>
                <Field
                  type="text"
                  name="name2"
                  className="form-control"
                />
                <ErrorMessage
                  name="name2"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Phone */}
              <div className="mb-3 col-md-4">
                <label htmlFor="phone2">Phone/Mobile Number</label>
                <Field
                  type="text"
                  name="phone2"
                  className="form-control"
                />
                <ErrorMessage
                  name="phone2"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Profession */}
              <div className="mb-3 col-md-4">
                <label htmlFor="profession2">Profession</label>
                <Field
                  type="text"
                  name="profession2"
                  className="form-control"
                />
                <ErrorMessage
                  name="profession2"
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
                <label htmlFor="name3">Identifier's Name</label>
                <Field
                  type="text"
                  name="name3"
                  className="form-control"
                />
                <ErrorMessage
                  name="name3"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Phone */}
              <div className="mb-3 col-md-4">
                <label htmlFor="phone3">Phone/Mobile Number</label>
                <Field
                  type="text"
                  name="phone3"
                  className="form-control"
                />
                <ErrorMessage
                  name="phone3"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Profession */}
              <div className="mb-3 col-md-4">
                <label htmlFor="profession3">Profession</label>
                <Field
                  type="text"
                  name="profession3"
                  className="form-control"
                />
                <ErrorMessage
                  name="profession3"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Save and Continue
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Identifiers;
