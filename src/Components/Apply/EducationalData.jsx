import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const EducationalData = ({ formData, setFormData }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    studyLevel: Yup.string().required("Study level is required"),
    gpa: Yup.number()
      .required("GPA is required")
      .min(0, "GPA cannot be less than 0")
      .max(4, "GPA cannot be more than 4"),
    universityYear: Yup.string().when("studyLevel", {
      is: "university",
      then: Yup.string().required("Please specify the university year"),
      otherwise: Yup.string().notRequired(),
    }),
    schoolClass: Yup.string().when("studyLevel", {
      is: "school",
      then: Yup.string().required("Please specify your class"),
      otherwise: Yup.string().notRequired(),
    }),
    siblingsInUniversity: Yup.number()
      .required("Number of siblings is required")
      .min(0, "The number cannot be less than zero"),
  });

  // Initial Values
  const initialValues = {
    studyLevel: formData.studyLevel || "",
    gpa: formData.gpa || "",
    universityYear: formData.universityYear || "",
    schoolClass: formData.schoolClass || "",
    siblingsInUniversity: formData.siblingsInUniversity || "",
  };

  // Submit Handler
  const handleSubmit = (values) => {
    setFormData((prev) => ({
      ...prev,
      educationalData: values,
    }));
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="input-group mb-4">
              <h3 className="mt-5">Study Level</h3>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="studyLevel">Study Level</label>
                  <Field as="select" name="studyLevel" className="form-control">
                    <option value="">-- Select --</option>
                    <option value="university">University Student</option>
                    <option value="school">School Student</option>
                  </Field>
                  <ErrorMessage name="studyLevel" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            {values.studyLevel && (
              <div className="input-group mb-4">
                <h3>Additional Details</h3>
                <div className="row">
                  {/* GPA Field */}
                  <div className="col-md-5 mb-3">
                    <label htmlFor="gpa">GPA</label>
                    <Field type="number" name="gpa" className="form-control" />
                    <ErrorMessage name="gpa" component="div" className="text-danger" />
                  </div>

                  {/* Conditional Fields Based on Study Level */}
                  {values.studyLevel === "university" && (
                    <div className="col-md-5 mb-3">
                      <label htmlFor="universityYear">University Year</label>
                      <Field as="select" name="universityYear" className="form-control">
                        <option value="">-- Select --</option>
                        <option value="first">First Year</option>
                        <option value="second">Second Year</option>
                        <option value="third">Third Year</option>
                        <option value="fourth">Fourth Year</option>
                        <option value="fifth">Fifth Year or Higher</option>
                      </Field>
                      <ErrorMessage name="universityYear" component="div" className="text-danger" />
                    </div>
                  )}
                  {values.studyLevel === "school" && (
                    <div className="col-md-5 mb-3">
                      <label htmlFor="schoolClass">Class</label>
                      <Field as="select" name="schoolClass" className="form-control">
                        <option value="">-- Select --</option>
                        <option value="grade12">Grade 12</option>
                      </Field>
                      <ErrorMessage name="schoolClass" component="div" className="text-danger" />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="input-group mb-4">
              <h3>Number of Siblings</h3>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="siblingsInUniversity">
                    Number of siblings studying at universities
                  </label>
                  <Field
                    type="number"
                    name="siblingsInUniversity"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="siblingsInUniversity"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end">
              <button type="submit" className="btn btn-primary mt-4">
                Save and Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EducationalData;
