import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GeneralInfo = ({ formData, setFormData }) => {
    // Validation Schema
    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        idNumber: Yup.string().required("ID Number is required"),
        cardType: Yup.string().required("Card Type is required"),
        dob: Yup.date().required("Date of Birth is required"),
        gender: Yup.string().required("Gender is required"),
        maritalStatus: Yup.string().required("Marital Status is required"),
        permanentResidence: Yup.string().required("Permanent Residence is required"),
        province: Yup.string().required("Province is required"),
        street: Yup.string().required("Street is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        temporaryAddress: Yup.string().required("Temporary Address is required"),
        currentAccommodation: Yup.string().required("Current Accommodation is required"),
        studentType: Yup.string().required("Please select your student type"),
        academicProgram: Yup.string().when("studentType", {
            is: "university",
            then: Yup.string().required("Academic Program is required"),
        }),
        college: Yup.string().when("studentType", {
            is: "university",
            then: Yup.string().required("College is required"),
        }),
        specialization: Yup.string().when("studentType", {
            is: "university",
            then: Yup.string().required("Specialization is required"),
        }),
        stream: Yup.string().when("studentType", {
            is: "school",
            then: Yup.string().required("Stream is required"),
        }),
    });

    // Initial Values
    const initialValues = {
        fullName: formData.fullName || "",
        idNumber: formData.idNumber || "",
        cardType: formData.cardType || "",
        dob: formData.dob || "",
        gender: formData.gender || "",
        maritalStatus: formData.maritalStatus || "",
        permanentResidence: formData.permanentResidence || "",
        province: formData.province || "",
        street: formData.street || "",
        phoneNumber: formData.phoneNumber || "",
        temporaryAddress: formData.temporaryAddress || "",
        currentAccommodation: formData.currentAccommodation || "",
        studentType: formData.studentType || "",
        academicProgram: formData.academicProgram || "",
        college: formData.college || "",
        specialization: formData.specialization || "",
        stream: formData.stream || "",
    };

    // Submit Handler
    const handleSubmit = (values) => {
        setFormData((prev) => ({
            ...prev,
            generalInfo: values,
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
                        {/* Group 1: Personal Information */}
                        <div className="input-group mb-4">
                            <h3 className="mt-5">Personal Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="fullName">Full Name</label>
                                    <Field type="text" name="fullName" className="form-control" />
                                    <ErrorMessage name="fullName" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="idNumber">ID Number</label>
                                    <Field type="text" name="idNumber" className="form-control" />
                                    <ErrorMessage name="idNumber" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="cardType">Card Type</label>
                                    <Field as="select" name="cardType" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="هوية فلسطينية">هوية فلسطينية</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="cardType" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <Field type="date" name="dob" className="form-control" />
                                    <ErrorMessage name="dob" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="gender">Gender</label>
                                    <Field as="select" name="gender" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="maritalStatus">Marital Status</label>
                                    <Field as="select" name="maritalStatus" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="maritalStatus" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 2: Student Type */}
                        <div className="input-group mb-4">
                            <h3>Student Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="studentType">Are you a University or School Student?</label>
                                    <Field as="select" name="studentType" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="university">University Student</option>
                                        <option value="school">School Student</option>
                                    </Field>
                                    <ErrorMessage name="studentType" component="div" className="text-danger" />
                                </div>

                                {values.studentType === "university" && (
                                    <>
                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="academicProgram">Academic Program</label>
                                            <Field type="text" name="academicProgram" className="form-control" />
                                            <ErrorMessage name="academicProgram" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="college">College</label>
                                            <Field type="text" name="college" className="form-control" />
                                            <ErrorMessage name="college" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="specialization">Major</label>
                                            <Field type="text" name="specialization" className="form-control" />
                                            <ErrorMessage name="specialization" component="div" className="text-danger" />
                                        </div>
                                    </>
                                )}

                                {values.studentType === "school" && (
                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="stream">Stream</label>
                                        <Field as="select" name="stream" className="form-control">
                                            <option value="">-- Select --</option>
                                            <option value="scientific">Scientific</option>
                                            <option value="literary">Literary</option>
                                            <option value="commercial">Commercial</option>
                                            <option value="industrial">Industrial</option>
                                            <option value="other">Other</option>
                                        </Field>
                                        <ErrorMessage name="stream" component="div" className="text-danger" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Group 3: Address Information */}
                        <div className="input-group mb-4">
                            <h3>Address Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="permanentResidence">Permanent Residence</label>
                                    <Field type="text" name="permanentResidence" className="form-control" />
                                    <ErrorMessage name="permanentResidence" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="province">The Province</label>
                                    <Field type="text" name="province" className="form-control" />
                                    <ErrorMessage name="province" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="street">Street</label>
                                    <Field type="text" name="street" className="form-control" />
                                    <ErrorMessage name="street" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 4: Contact Information */}
                        <div className="input-group mb-4">
                            <h3>Contact Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <Field type="text" name="phoneNumber" className="form-control" />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
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

export default GeneralInfo;
