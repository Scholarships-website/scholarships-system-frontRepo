import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GeneralInfo = ({ formData, setFormData,saveStepData  }) => {
    // Validation Schema
    const validationSchema = Yup.object({
        // ID_Number: Yup.string().required("ID Number is required"),
        // Card_Type: Yup.string().required("Card Type is required"),
        // Martial_Status: Yup.string().required("Marital Status is required"),
        // Permanent_Residence: Yup.string().required("Permanent Residence is required"),
        // province: Yup.string().required("Province is required"),
        // street: Yup.string().required("Street is required"),
        // phoneNumber: Yup.string().required("Phone Number is required"),
        // temporaryAddress: Yup.string().required("Temporary Address is required"),
        // currentAccommodation: Yup.string().required("Current Accommodation is required"),
        // student_type: Yup.string().required("Please select your student type"),
        // academic_program: Yup.string().required("Academic Program is required"), // Removed conditional logic
        // college: Yup.string().required("College is required"), // Removed conditional logic
        // major: Yup.string().required("Major is required"), // Removed conditional logic
        // stream: Yup.string().required("Stream is required"), // Removed conditional logic
      });

    // Initial Values
    const initialValues = {
        // fullName: formData.fullName || "",
        ID_Number: formData.ID_Number || "",
        Card_Type: formData.Card_Type || "",
        // dob: formData.dob || "",
        // gender: formData.gender || "",
        Martial_Status: formData.Martial_Status || "",
        Permanent_Residence: formData.Permanent_Residence || "",
        province: formData.province || "",
        street: formData.street || "",
        phoneNumber: formData.phoneNumber || "",
        temporaryAddress: formData.temporaryAddress || "",
        currentAccommodation: formData.currentAccommodation || "",
        student_type: formData.student_type || "",
        academic_program: formData.academic_program || "",
        college: formData.college || "",
        major: formData.major || "",
        stream: formData.stream || "",
    };

    // Submit Handler
    const handleSubmit = (values) => {
        console.log("Submitting form...");
        console.log(values);
        saveStepData({ stepKey: 'generalInfo', data: values });
        setFormData((prev) => ({
          ...prev,
          generalInfo: values,
        }));
    };
    return (
        <div className="container">
            <Formik
                initialValues={formData.generalInfo || initialValues}
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
                                    <label htmlFor="ID_Number">ID Number</label>
                                    <Field type="text" name="ID_Number" className="form-control" />
                                    <ErrorMessage name="ID_Number" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Card_Type">Card Type</label>
                                    <Field as="select" name="Card_Type" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="هوية فلسطينية">هوية فلسطينية</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="Card_Type" component="div" className="text-danger" />
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
                                    <label htmlFor="Martial_Status">Marital Status</label>
                                    <Field as="select" name="Martial_Status" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="Martial_Status" component="div" className="text-danger" />
                                </div>
                            </div>
                        </div>

                        {/* Group 2: Student Type */}
                        <div className="input-group mb-4">
                            <h3>Student Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="student_type">Are you a University or School Student?</label>
                                    <Field as="select" name="student_type" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="university">University Student</option>
                                        <option value="school">School Student</option>
                                    </Field>
                                    <ErrorMessage name="student_type" component="div" className="text-danger" />
                                </div>

                                {values.student_type === "university" && (
                                    <>
                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="academic_program">Academic Program</label>
                                            <Field type="text" name="academic_program" className="form-control" />
                                            <ErrorMessage name="academic_program" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="college">College</label>
                                            <Field type="text" name="college" className="form-control" />
                                            <ErrorMessage name="college" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="major">Major</label>
                                            <Field type="text" name="major" className="form-control" />
                                            <ErrorMessage name="major" component="div" className="text-danger" />
                                        </div>
                                    </>
                                )}

                                {values.student_type === "school" && (
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
                                    <label htmlFor="Permanent_Residence">Permanent Residence</label>
                                    <Field type="text" name="Permanent_Residence" className="form-control" />
                                    <ErrorMessage name="Permanent_Residence" component="div" className="text-danger" />
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
