import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import moment from "moment/moment";

const GeneralInfo = ({ formData, setFormData, saveStepData }) => {
    const { studentData, userData } = useContext(UserContext);
    const [formValues, setFormValues] = useState({
        fullname: "",
        birthdate: "",
        Gender: "",
    });
    useEffect(() => {
        if (studentData) {
            setFormValues({
                fullname: studentData.fullname || "",
                birthdate: studentData.birthdate ? moment(studentData.birthdate).format('YYYY-MM-DD') : "",
                Gender: studentData.gender || "",
            });
        }
    }, [studentData]);
    const initialValues = {
        ID_Number: formData.ID_Number || "",
        Card_Type: formData.Card_Type || "",
        Martial_Status: formData.Martial_Status || "",
        Permanent_Residence: formData.Permanent_Residence || "",
        province: formData.province || "",
        street: formData.street || "",
        phoneNumber: userData.phoneNumber || "",
        // student_type: (formData.student_type || "school").trim(),
        // academic_program: formData.academic_program || "",
        // college: formData.college || "",
        // major: formData.major || "",
        // stream: formData.stream || "",
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    // Validation Schema
    const validationSchema = Yup.object().shape({
        ID_Number: Yup.string().required("ID Number is required"),
        Card_Type: Yup.string().required("Card Type is required"),
        Martial_Status: Yup.string().required("Marital Status is required"),
        Permanent_Residence: Yup.string().required("Permanent Residence is required"),
        province: Yup.string().required("Province is required"),
        street: Yup.string().required("Street is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        // student_type: Yup.string().required("Please select your student type"),

        // academic_program: Yup.lazy((value, { parent }) =>
        //     parent.student_type === "university"
        //         ? Yup.string().required("Academic Program is required")
        //         : Yup.string().notRequired()
        // ),
        // college: Yup.lazy((value, { parent }) =>
        //     parent.student_type === "university"
        //         ? Yup.string().required("College is required")
        //         : Yup.string().notRequired()
        // ),
        // major: Yup.lazy((value, { parent }) =>
        //     parent.student_type === "university"
        //         ? Yup.string().required("Major is required")
        //         : Yup.string().notRequired()
        // ),
        // stream: Yup.lazy((value, { parent }) =>
        //     parent.student_type === "school"
        //         ? Yup.string().required("Stream is required")
        //         : Yup.string().notRequired()
        // ),

    });
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
                enableReinitialize={true}  // Allow re-initialization of form values on studentData changeenableReinitialize={true}  // Allow re-initialization of form values on studentData change
            >
                {({ values }) => (
                    <Form>
                        {/* Group 1: Personal Information */}
                        <div className="input-group mb-4">
                            <h3 className="mt-5">Personal Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="fullname">Full Name</label>
                                    <Field type="text" name="fullname" id="fullname" className="form-control" value={formValues.fullname} readOnly />
                                    <ErrorMessage name="fullname" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="ID_Number">ID Number</label>
                                    <Field type="text" name="ID_Number" id="ID_Number" className="form-control" />
                                    <ErrorMessage name="ID_Number" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Card_Type">Card Type</label>
                                    <Field as="select" name="Card_Type" id="Card_Type" className="form-control">
                                        <option value="">-- Select --</option>
                                        <option value="هوية فلسطينية">هوية فلسطينية</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="Card_Type" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <Field type="date" name="dob" id="dob" className="form-control" value={formValues.birthdate} readOnly />
                                    <ErrorMessage name="dob" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="gender">Gender</label>
                                    <Field as="select" name="gender" id="gender" className="form-control" value={formValues.Gender} // Set the selected value here
                                        onChange={handleChange}>
                                        <option value="">-- Select --</option>
                                        <option value="Male" >Male</option>
                                        <option value="female" >Female</option>
                                        <option value="Other" >Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Martial_Status">Marital Status</label>
                                    <Field as="select" name="Martial_Status" id="Martial_Status" className="form-control">
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
                        {/* <div className="input-group mb-4">
                            <h3>Student Information</h3>
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
                                    </>
                                )}

                                {values.student_type === "school" && (
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
                                )}
                            </div>
                        </div> */}

                        {/* Group 3: Address Information */}
                        <div className="input-group mb-4">
                            <h3>Address Information</h3>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="Permanent_Residence">Permanent Residence</label>
                                    <Field type="text" name="Permanent_Residence" id="Permanent_Residence" className="form-control" />
                                    <ErrorMessage name="Permanent_Residence" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="province">The Province</label>
                                    <Field type="text" name="province" id="province" className="form-control" />
                                    <ErrorMessage name="province" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="street">Street</label>
                                    <Field type="text" name="street" id="street" className="form-control" />
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
                                    <Field type="text" name="phoneNumber" id="phoneNumber" className="form-control" readOnly />
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
