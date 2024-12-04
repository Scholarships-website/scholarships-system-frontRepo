import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const HealthStatus = ({ formData, setFormData }) => {
    // Validation Schema
    const validationSchema = Yup.object({
        familyDisabilities: Yup.number()
            .required("This field is required")
            .min(0, "The number cannot be less than zero"),
        healthDetails: Yup.array().when("familyDisabilities", {
            is: (val) => val > 0,
            then: Yup.array().of(
                Yup.object({
                    description: Yup.string().required("Description is required"),
                })
            ),
            otherwise: Yup.array().notRequired(),
        }),
    });

    // Initial Values
    const initialValues = {
        familyDisabilities: formData.familyDisabilities || 0,
        healthDetails: formData.healthDetails || [{ description: "" }],
    };

    // Submit Handler
    const handleSubmit = (values) => {
        setFormData((prev) => ({
            ...prev,
            healthStatus: values,
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
                        {/* Number of Disabilities */}
                        <div className="row my-5">
                            <div className="col-md-5">
                                <label htmlFor="familyDisabilities" className="form-label">
                                    Number of Disabilities in the Family
                                </label>
                                <Field
                                    type="number"
                                    name="familyDisabilities"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="familyDisabilities"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>
                        </div>

                        {/* Details of Disabilities */}
                        {values.familyDisabilities > 0 && (
                            <div className="mb-4">
                                <h4 className="mb-3">Details of Disabilities</h4>
                                <FieldArray name="healthDetails">
                                    {({ push, remove }) => (
                                        <div>
                                            {values.healthDetails.map((_, index) => (
                                                <div key={index} className="row mb-3">
                                                    <div className="col-md-5">
                                                        <label
                                                            htmlFor={`healthDetails.${index}.description`}
                                                            className="form-label"
                                                        >
                                                            Description
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name={`healthDetails.${index}.description`}
                                                            className="form-control"
                                                            placeholder="Describe the disability"
                                                        />
                                                        <ErrorMessage
                                                            name={`healthDetails.${index}.description`}
                                                            component="div"
                                                            className="text-danger mt-1"
                                                        />
                                                    </div>
                                                    <div className="col-md-2 d-flex align-items-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger w-100"
                                                            onClick={() => remove(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="btn btn-primary mt-3"
                                                onClick={() => push({ description: "" })}
                                            >
                                                Add Entry
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Save and Continue
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default HealthStatus;
