import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const EducationalData = ({ formData, setFormData,saveStepData }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    // Study_Level: Yup.string()
    //   .required("Study level is required")
    //   .oneOf(["university", "school"], "Invalid study level"),
    // GPA: Yup.number()
    //   .required("GPA is required")
    //   .min(0, "GPA cannot be less than 0")
    //   .max(4, "GPA cannot be more than 4"),
    // university_year: Yup.string().when("Study_Level", {
    //   is: (value) => value === "university",
    //   then: Yup.string().required("Please specify the university year"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // class_year: Yup.string().when("Study_Level", {
    //   is: (value) => value === "school",
    //   then: Yup.string().required("Please specify your class"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // Number_of_Siblings: Yup.number()
    //   .required("Number of siblings is required")
    //   .min(0, "The number cannot be less than zero"),
  });

  // Initial Values
  const initialValues = {
    Study_Level: formData.Study_Level || "",
    GPA: formData.GPA || "",
    university_year: formData.university_year || "",
    class_year: formData.class_year || "",
    Number_of_Siblings: formData.Number_of_Siblings || "",
  };

  // Submit Handler
  const handleSubmit = (values) => {
    console.log("Submitting form...");
    console.log(values);
    saveStepData({ stepKey: 'educationalData', data: values });
    setFormData((prev) => ({
      ...prev,
      educationalData: values,
    }));
  };

  return (
    <div className="container">
      <Formik
        initialValues={formData.educationalData || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="input-group mb-4">
              <h3 className="mt-5">Study Level</h3>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="Study_Level">Study Level</label>
                  <Field as="select" name="Study_Level" className="form-control">
                    <option value="">-- Select --</option>
                    <option value="university">University Student</option>
                    <option value="school">School Student</option>
                  </Field>
                  <ErrorMessage name="Study_Level" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            {values.Study_Level && (
              <div className="input-group mb-4">
                <h3>Additional Details</h3>
                <div className="row">
                  {/* GPA Field */}
                  <div className="col-md-5 mb-3">
                    <label htmlFor="GPA">GPA</label>
                    <Field type="number" name="GPA" className="form-control" />
                    <ErrorMessage name="GPA" component="div" className="text-danger" />
                  </div>

                  {/* Conditional Fields Based on Study Level */}
                  {values.Study_Level === "university" && (
                    <div className="col-md-5 mb-3">
                      <label htmlFor="university_year">University Year</label>
                      <Field as="select" name="university_year" className="form-control">
                        <option value="">-- Select --</option>
                        <option value="first">First Year</option>
                        <option value="second">Second Year</option>
                        <option value="third">Third Year</option>
                        <option value="fourth">Fourth Year</option>
                        <option value="fifth">Fifth Year or Higher</option>
                      </Field>
                      <ErrorMessage name="university_year" component="div" className="text-danger" />
                    </div>
                  )}
                  {values.Study_Level === "school" && (
                    <div className="col-md-5 mb-3">
                      <label htmlFor="class_year">Class</label>
                      <Field as="select" name="class_year" className="form-control">
                        <option value="">-- Select --</option>
                        <option value="grade12">Grade 12</option>
                      </Field>
                      <ErrorMessage name="class_year" component="div" className="text-danger" />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="input-group mb-4">
              <h3>Number of Siblings</h3>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="Number_of_Siblings">
                    Number of siblings studying at universities
                  </label>
                  <Field
                    type="number"
                    name="Number_of_Siblings"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="Number_of_Siblings"
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
