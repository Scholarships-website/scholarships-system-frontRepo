import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const FamilyInfo = ({ formData, setFormData,saveStepData }) => {
    // Validation Schema
    const validationSchema = Yup.object({
        // Head_of_the_family: Yup.string().required("Head of the family is required"),
        // breadwinner: Yup.string().required("Name of the head of the household is required"),
        // breadwinner_id: Yup.string().required("ID number is required"),
        // work_nature: Yup.string().required("Nature of work for the father is required"),
        // institution: Yup.string().required("Name of the institution is required"),
        // income_category: Yup.string().required("Monthly income category is required"),
        // Does_mother_work: Yup.string().required("Please specify if the student's mother works"),
        // any_other_income: Yup.string().required("Please specify if there is other income"),
        // Total_number_of_family_members: Yup.number()
        //     .required("Number of family members is required")
        //     .min(1, "There must be at least one family member"),
        // Does_student_work: Yup.string().required("Please specify if the student works"),
        // social_affairs_case: Yup.string().required("Please specify if the family is registered as a social affairs case"),
        // UNRWA_card: Yup.string().required("Please specify if the family has a UNRWA card"),
    });

    // Initial Values
    const initialValues = {
        Head_of_the_family: formData.Head_of_the_family || "",
        breadwinner: formData.breadwinner || "",
        breadwinner_id: formData.breadwinner_id || "",
        work_nature: formData.work_nature || "",
        institution: formData.institution || "",
        income_category: formData.income_category || "",
        Does_mother_work: formData.Does_mother_work || "",
        any_other_income: formData.any_other_income || "",
        Total_number_of_family_members: formData.Total_number_of_family_members || "",
        Does_student_work: formData.Does_student_work || "",
        social_affairs_case: formData.social_affairs_case || "",
        UNRWA_card: formData.UNRWA_card || "",
    };

    // Submit Handler
    const handleSubmit = (values) => {
        console.log("Submitting form...");
        console.log(values);
        saveStepData({ stepKey: 'familyInfo', data: values });
        setFormData((prev) => ({
            ...prev,
            familyInfo: values,
        }));
    };

    return (
        <div className="container">
            <Formik
                initialValues={formData.familyInfo || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        {/* Group 1: Basic Family Information */}
                        <div className="input-group mb-4">
                            <h3 className="mt-5">Basic Family Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Head_of_the_family">Head of the family</label>
                                    <Field as="select" name="Head_of_the_family" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="father">Father</option>
                                        <option value="mother">Mother</option>
                                        <option value="guardian">Guardian</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="Head_of_the_family" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="breadwinner">Name of the breadwinner</label>
                                    <Field type="text" name="breadwinner" className="form-control" />
                                    <ErrorMessage name="breadwinner" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="breadwinner_id">ID number</label>
                                    <Field type="text" name="breadwinner_id" className="form-control" />
                                    <ErrorMessage name="breadwinner_id" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 2: Father's Work Details */}
                        <div className="input-group mb-4">
                            <h3>Father's Work Details</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="work_nature">Nature of work for the father</label>
                                    <Field as="select" name="work_nature" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="government">Government Employee</option>
                                        <option value="private">Private Sector Employee</option>
                                        <option value="business">Business Owner</option>
                                        <option value="unemployed">Unemployed</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="work_nature" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="institution">Name of the institution</label>
                                    <Field type="text" name="institution" className="form-control" />
                                    <ErrorMessage name="institution" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="income_category">Monthly income category</label>
                                    <Field as="select" name="income_category" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </Field>
                                    <ErrorMessage name="income_category" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 3: Additional Family Details */}
                        <div className="input-group mb-4">
                            <h3>Additional Family Details</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Does_mother_work">Does the student's mother work?</label>
                                    <Field as="select" name="Does_mother_work" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="Does_mother_work" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="any_other_income">Is there any other income?</label>
                                    <Field as="select" name="any_other_income" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="any_other_income" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Total_number_of_family_members">Total number of family members</label>
                                    <Field type="number" name="Total_number_of_family_members" className="form-control" />
                                    <ErrorMessage name="Total_number_of_family_members" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 4: Social and Registration Details */}
                        <div className="input-group mb-4">
                            <h3>Social and Registration Details</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Does_student_work">Does the student work?</label>
                                    <Field as="select" name="Does_student_work" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="Does_student_work" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="social_affairs_case">Is the family registered as a social affairs case?</label>
                                    <Field as="select" name="social_affairs_case" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="social_affairs_case" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="UNRWA_card">Does the family have a UNRWA card?</label>
                                    <Field as="select" name="UNRWA_card" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="UNRWA_card" component="div" className="text-danger" />
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

export default FamilyInfo;
