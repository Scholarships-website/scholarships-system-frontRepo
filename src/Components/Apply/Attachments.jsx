import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Attachments = ({currentStep, totalSteps, prevStep, formData, setFormData,saveStepData,nextStep,onSubmit }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    Student_ID_Image: Yup.mixed()
      .required("Student's ID image is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
      Head_of_Household_ID_Image: Yup.mixed()
      .required("Head of household's ID with annex is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
      Mother_ID_Image: Yup.mixed()
      .required("Mother's ID image is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.name.endsWith(".pdf");
      }),
      Sibling_ID_Image: Yup.mixed()
      .nullable()
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        // Skip validation if the field is empty or null
        if (!value) return true; 
        return value.name.endsWith(".pdf");
      }),
    
    Special_Cases_Report: Yup.mixed()
      .nullable()
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        if (!value) return true; 
        return value.name.endsWith(".pdf");
      }),
  });

  // Initial Values
  const initialValues = {
    Student_ID_Image: formData.Student_ID_Image || null,
    Head_of_Household_ID_Image: formData?.Head_of_Household_ID_Image || null,
    Mother_ID_Image: formData?.Mother_ID_Image || null,
    Sibling_ID_Image: formData?.Sibling_ID_Image || null,
    Special_Cases_Report: formData?.Special_Cases_Report || null,
  };

  // Submit Handler
  const handleSubmit = (values) => {
            console.log("Submitting form...");
        console.log(values);
        saveStepData({ stepKey: 'pdffiles', data: values });

    setFormData((prev) => ({
      ...prev,
      pdffiles: values,
    }));
    onSubmit();
  };

  return (
    <div className="container">
      <Formik
                initialValues={formData.pdffiles || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="my-5 p-3 border rounded">
              <h5>Required Attachments</h5>

              {/* Student's ID Image */}
              <div className="mb-3 col-md-5">
                <label htmlFor="Student_ID_Image">Student's ID Image (PDF Only)</label>
                <input
                  type="file"
                  name="Student_ID_Image"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("Student_ID_Image", event.currentTarget.files[0])}
                />
                <ErrorMessage name="Student_ID_Image" component="div" className="text-danger" />
              </div>

              {/* Head of Household's ID with Annex (children under 18) */}
              <div className="mb-3 col-md-5">
                <label htmlFor="Head_of_Household_ID_Image">Head of Household's ID with Annex (PDF Only)</label>
                <input
                  type="file"
                  name="Head_of_Household_ID_Image"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("Head_of_Household_ID_Image", event.currentTarget.files[0])}
                />
                <ErrorMessage name="Head_of_Household_ID_Image" component="div" className="text-danger" />
              </div>

              {/* Mother's ID Image */}
              <div className="mb-3 col-md-5">
                <label htmlFor="Mother_ID_Image">Mother's ID Image (PDF Only)</label>
                <input
                  type="file"
                  name="Mother_ID_Image"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("Mother_ID_Image", event.currentTarget.files[0])}
                />
                <ErrorMessage name="Mother_ID_Image" component="div" className="text-danger" />
              </div>

              {/* Certificate for Brothers/Sisters in Universities */}
              <div className="mb-3 col-md-5">
                <label htmlFor="Sibling_ID_Image">Certificate for Brothers/Sisters Enrolled in Universities (PDF Only)</label>
                <input
                  type="file"
                  name="Sibling_ID_Image"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("Sibling_ID_Image", event.currentTarget.files[0])}
                />
                <ErrorMessage name="Sibling_ID_Image" component="div" className="text-danger" />
              </div>

              {/* Special Cases Report */}
              <div className="mb-3 col-md-5">
                <label htmlFor="Special_Cases_Report">Special Cases Report (PDF Only)</label>
                <input
                  type="file"
                  name="Special_Cases_Report"
                  accept=".pdf"
                  className="form-control"
                  onChange={(event) => setFieldValue("Special_Cases_Report", event.currentTarget.files[0])}
                />
                <ErrorMessage name="Special_Cases_Report" component="div" className="text-danger" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end step-navigation">
                            <button
                                type="button"
                                className="prev-btn btn mt-4 "
                                style={{backgroundColor:'#5a6268'}}
                                onClick={prevStep}
                                disabled={currentStep === 1}
                            >
                                Previous
                            </button>
                            <button type="submit" className="btn btn-primary mt-4">
                                Submit
                            </button>
                        </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Attachments;
