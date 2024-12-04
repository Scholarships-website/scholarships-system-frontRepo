import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Attachments = ({ formData, setFormData }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    studentIdImage: Yup.mixed()
      .required("Student's ID image is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
    headOfHouseholdIdWithAnnex: Yup.mixed()
      .required("Head of household's ID with annex is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
    motherIdImage: Yup.mixed()
      .required("Mother's ID image is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
    certificateForBrothers: Yup.mixed()
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
    specialCasesReport: Yup.mixed()
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
  });

  // Initial Values
  const initialValues = {
    studentIdImage: formData?.studentIdImage || null,
    headOfHouseholdIdWithAnnex: formData?.headOfHouseholdIdWithAnnex || null,
    motherIdImage: formData?.motherIdImage || null,
    certificateForBrothers: formData?.certificateForBrothers || null,
    specialCasesReport: formData?.specialCasesReport || null,
  };

  // Submit Handler
  const handleSubmit = (values) => {
    setFormData((prev) => ({
      ...prev,
      attachments: values,
    }));
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="my-5 p-3 border rounded">
              <h5>Required Attachments</h5>

              {/* Student's ID Image */}
              <div className="mb-3 col-md-5">
                <label htmlFor="studentIdImage">Student's ID Image (PDF Only)</label>
                <input
                  type="file"
                  name="studentIdImage"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("studentIdImage", event.currentTarget.files[0])}
                />
                <ErrorMessage name="studentIdImage" component="div" className="text-danger" />
              </div>

              {/* Head of Household's ID with Annex (children under 18) */}
              <div className="mb-3 col-md-5">
                <label htmlFor="headOfHouseholdIdWithAnnex">Head of Household's ID with Annex (PDF Only)</label>
                <input
                  type="file"
                  name="headOfHouseholdIdWithAnnex"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("headOfHouseholdIdWithAnnex", event.currentTarget.files[0])}
                />
                <ErrorMessage name="headOfHouseholdIdWithAnnex" component="div" className="text-danger" />
              </div>

              {/* Mother's ID Image */}
              <div className="mb-3 col-md-5">
                <label htmlFor="motherIdImage">Mother's ID Image (PDF Only)</label>
                <input
                  type="file"
                  name="motherIdImage"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("motherIdImage", event.currentTarget.files[0])}
                />
                <ErrorMessage name="motherIdImage" component="div" className="text-danger" />
              </div>

              {/* Certificate for Brothers/Sisters in Universities */}
              <div className="mb-3 col-md-5">
                <label htmlFor="certificateForBrothers">Certificate for Brothers/Sisters Enrolled in Universities (PDF Only)</label>
                <input
                  type="file"
                  name="certificateForBrothers"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("certificateForBrothers", event.currentTarget.files[0])}
                />
                <ErrorMessage name="certificateForBrothers" component="div" className="text-danger" />
              </div>

              {/* Special Cases Report */}
              <div className="mb-3 col-md-5">
                <label htmlFor="specialCasesReport">Special Cases Report (PDF Only)</label>
                <input
                  type="file"
                  name="specialCasesReport"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("specialCasesReport", event.currentTarget.files[0])}
                />
                <ErrorMessage name="specialCasesReport" component="div" className="text-danger" />
              </div>

            </div>

            {/* Submit Button */}
            <div className="text-end">

              <button type="submit" className="btn btn-primary">
                Save and Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Attachments;
