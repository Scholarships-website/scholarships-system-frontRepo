import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const FamilyInfo = ({ formData, setFormData }) => {
    // Validation Schema
    const validationSchema = Yup.object({
        headOfFamily: Yup.string().required("Head of the family is required"),
        breadwinnerName: Yup.string().required("Name of the head of the household is required"),
        breadwinnerID: Yup.string().required("ID number is required"),
        fatherWorkNature: Yup.string().required("Nature of work for the father is required"),
        institutionName: Yup.string().required("Name of the institution is required"),
        incomeCategory: Yup.string().required("Monthly income category is required"),
        motherWorks: Yup.string().required("Please specify if the student's mother works"),
        otherIncome: Yup.string().required("Please specify if there is other income"),
        familyMembers: Yup.number()
            .required("Number of family members is required")
            .min(1, "There must be at least one family member"),
        studentWorks: Yup.string().required("Please specify if the student works"),
        socialAffairsCase: Yup.string().required("Please specify if the family is registered as a social affairs case"),
        unrwaCard: Yup.string().required("Please specify if the family has a UNRWA card"),
    });

    // Initial Values
    const initialValues = {
        headOfFamily: formData.headOfFamily || "",
        breadwinnerName: formData.breadwinnerName || "",
        breadwinnerID: formData.breadwinnerID || "",
        fatherWorkNature: formData.fatherWorkNature || "",
        institutionName: formData.institutionName || "",
        incomeCategory: formData.incomeCategory || "",
        motherWorks: formData.motherWorks || "",
        otherIncome: formData.otherIncome || "",
        familyMembers: formData.familyMembers || "",
        studentWorks: formData.studentWorks || "",
        socialAffairsCase: formData.socialAffairsCase || "",
        unrwaCard: formData.unrwaCard || "",
    };

    // Submit Handler
    const handleSubmit = (values) => {
        setFormData((prev) => ({
            ...prev,
            familyInfo: values,
        }));
    };

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
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
                                    <label htmlFor="headOfFamily">Head of the family</label>
                                    <Field as="select" name="headOfFamily" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="father">Father</option>
                                        <option value="mother">Mother</option>
                                        <option value="guardian">Guardian</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="headOfFamily" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="breadwinnerName">Name of the breadwinner</label>
                                    <Field type="text" name="breadwinnerName" className="form-control" />
                                    <ErrorMessage name="breadwinnerName" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="breadwinnerID">ID number</label>
                                    <Field type="text" name="breadwinnerID" className="form-control" />
                                    <ErrorMessage name="breadwinnerID" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 2: Father's Work Details */}
                        <div className="input-group mb-4">
                            <h3>Father's Work Details</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="fatherWorkNature">Nature of work for the father</label>
                                    <Field as="select" name="fatherWorkNature" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="government">Government Employee</option>
                                        <option value="private">Private Sector Employee</option>
                                        <option value="business">Business Owner</option>
                                        <option value="unemployed">Unemployed</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="fatherWorkNature" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="institutionName">Name of the institution</label>
                                    <Field type="text" name="institutionName" className="form-control" />
                                    <ErrorMessage name="institutionName" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="incomeCategory">Monthly income category</label>
                                    <Field as="select" name="incomeCategory" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </Field>
                                    <ErrorMessage name="incomeCategory" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 3: Additional Family Details */}
                        <div className="input-group mb-4">
                            <h3>Additional Family Details</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="motherWorks">Does the student's mother work?</label>
                                    <Field as="select" name="motherWorks" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="motherWorks" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="otherIncome">Is there any other income?</label>
                                    <Field as="select" name="otherIncome" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="otherIncome" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="familyMembers">Total number of family members</label>
                                    <Field type="number" name="familyMembers" className="form-control" />
                                    <ErrorMessage name="familyMembers" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 4: Social and Registration Details */}
                        <div className="input-group mb-4">
                            <h3>Social and Registration Details</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="studentWorks">Does the student work?</label>
                                    <Field as="select" name="studentWorks" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="studentWorks" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="socialAffairsCase">Is the family registered as a social affairs case?</label>
                                    <Field as="select" name="socialAffairsCase" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="socialAffairsCase" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="unrwaCard">Does the family have a UNRWA card?</label>
                                    <Field as="select" name="unrwaCard" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="unrwaCard" component="div" className="text-danger" />
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
