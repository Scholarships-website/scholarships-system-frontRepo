import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const EducationalData = ({ formData, setFormData }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    studyLevel: Yup.string().required("Study level is required"),
    universityYear: Yup.string().when("studyLevel", {
      is: "university",
      then: Yup.string().required("Please specify the university year"),
      otherwise: Yup.string().notRequired(),
    }),
    siblingsInUniversity: Yup.number()
      .required("Number of siblings is required")
      .min(0, "The number cannot be less than zero"),
  });

  // Initial Values
  const initialValues = {
    studyLevel: formData.studyLevel || "",
    universityYear: formData.universityYear || "",
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

                {values.studyLevel === "university" && (
                  <div className="col-md-5 mb-3">
                    <label htmlFor="universityYear">What is your university year?</label>
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
              </div>
            </div>
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
