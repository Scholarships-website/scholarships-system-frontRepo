import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const EducationalData = ({currentStep, totalSteps, prevStep, formData, setFormData, saveStepData,nextStep }) => {
  // Validation Schema
  const validationSchema = Yup.object({

    GPA: Yup.number()
      .required("GPA is required")
      .min(0, "GPA cannot be less than 0")
      .max(4, "GPA cannot be more than 4"),

    Number_of_Siblings: Yup.number()
      .required("Number of siblings is required")
      .min(0, "The number cannot be less than zero"),

    student_type: Yup.string().required("Please select your student type"),

    academic_program: Yup.lazy((value, { parent }) =>
        parent.student_type === "university"
            ? Yup.string().required("Academic Program is required")
            : Yup.string().notRequired()
    ),
    college: Yup.lazy((value, { parent }) =>
        parent.student_type === "university"
            ? Yup.string().required("College is required")
            : Yup.string().notRequired()
    ),
    major: Yup.lazy((value, { parent }) =>
        parent.student_type === "university"
            ? Yup.string().required("Major is required")
            : Yup.string().notRequired()
    ),
    university_year: Yup.lazy((value, { parent }) =>
        parent.student_type === "university"
            ? Yup.string().required("university year is required")
            : Yup.string().notRequired()
    ),
    stream: Yup.lazy((value, { parent }) =>
        parent.student_type === "school"
            ? Yup.string().required("Stream is required")
            : Yup.string().notRequired()
    ),
    class_year: Yup.lazy((value, { parent }) =>
    parent.student_type === "school"
        ? Yup.string().required("Class is required")
        : Yup.string().notRequired()
),
  });

  // Initial Values
  const initialValues = {
    // Study_Level: formData.Study_Level || "",
    student_type: (formData.student_type || "school").trim(),
    academic_program: formData.academic_program || "",
    college: formData.college || "",
    major: formData.major || "",
    stream: formData.stream || "",
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
    nextStep();

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
                  <label htmlFor="student_type">Are you a University or School Student?</label>
                  <Field as="select" name="student_type" id="student_type" className="form-control">
                    <option value="">-- Select --</option>
                    <option value="university">University Student</option>
                    <option value="school">School Student</option>
                  </Field>
                  <ErrorMessage name="student_type" component="div" className="text-danger" />
                </div>
                <div className="col-md-5 mb-3">
                  <label htmlFor="GPA">GPA</label>
                  <Field type="number" name="GPA" className="form-control" />
                  <ErrorMessage name="GPA" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            {values.student_type && (
              <div className="input-group mb-4">
                <h3>Additional Details</h3>
                <div className="row">


                  {/* Conditional Fields Based on Study Level */}
                  {values.student_type === "university" && (
                    <>
                      <div className="col-md-5 mb-3">
                        <label htmlFor="academic_program">Academic Program</label>
                        <Field type="text" name="academic_program" id="academic_program" className="form-control" />
                        <ErrorMessage name="academic_program" component="div" className="text-danger" />
                      </div>

                      <div className="col-md-5 mb-3">
                        <label htmlFor="college">College</label>
                        <Field type="text" name="college" id="college" className="form-control" />
                        <ErrorMessage name="college" component="div" className="text-danger" />
                      </div>

                      <div className="col-md-5 mb-3">
                        <label htmlFor="major">Major</label>
                        <Field type="text" name="major" id="major" className="form-control" />
                        <ErrorMessage name="major" component="div" className="text-danger" />
                      </div>
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
                    </>)}
                  {values.student_type === "school" && (
                    <>
                      <div className="col-md-5 mb-3">
                        <label htmlFor="stream">Stream</label>
                        <Field as="select" name="stream" id="stream" className="form-control">
                          <option value="">-- Select --</option>
                          <option value="scientific">Scientific</option>
                          <option value="literary">Literary</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="stream" component="div" className="text-danger" />
                      </div>
                      <div className="col-md-5 mb-3">
                        <label htmlFor="class_year">Class</label>
                        <Field as="select" name="class_year" className="form-control">
                          <option value="">-- Select --</option>
                          <option value="grade12">Grade 12</option>
                        </Field>
                        <ErrorMessage name="class_year" component="div" className="text-danger" />
                      </div>
                    </>)}
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
