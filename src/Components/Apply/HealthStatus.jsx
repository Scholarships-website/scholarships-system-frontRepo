import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const HealthStatus = ({currentStep, totalSteps, prevStep, formData, setFormData, saveStepData,nextStep,applicationDetails }) => {
    // Validation Schema
    const validationSchema = Yup.object({
        Number_of_Disabilities_in_the_Family: Yup.number()
            .required("This field is required")
            .min(0, "The number cannot be less than zero"),
    });

    // Initial Values
    const initialValues = {
        Number_of_Disabilities_in_the_Family: applicationDetails?.Number_of_Disabilities_in_the_Family || formData?.Number_of_Disabilities_in_the_Family || 0,
        Disabilities_description: applicationDetails?.Disabilities_description || formData?.Disabilities_description || [],
    };

    // Submit Handler
    const handleSubmit = (values) => {
        console.log("Submitting form...");
        console.log(values);
        saveStepData({ stepKey: 'healthStatus', data: values });
        setFormData((prev) => ({
            ...prev,
            healthStatus: values,
        }));
        nextStep();
    };

    return (
        <div className="container">
            <Formik
                initialValues={formData.healthStatus || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="row my-5">
                            <div className="col-md-5">
                                <label htmlFor="Number_of_Disabilities_in_the_Family" className="form-label">
                                    Number of Disabilities in the Family <span className="text-danger"> * </span>
                                </label>
                                <Field
                                    type="number"
                                    name="Number_of_Disabilities_in_the_Family"
                                    className="form-control"
                                    onChange={(e) => {
                                        const number = parseInt(e.target.value, 10);
                                        setFieldValue("Number_of_Disabilities_in_the_Family", number);
                                        const descriptions = Array(number).fill("");
                                        setFieldValue("Disabilities_description", descriptions);
                                    }}
                                />
                                <ErrorMessage
                                    name="Number_of_Disabilities_in_the_Family"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>
                        </div>

                        {/* Dynamic Text Areas for Disabilities */}
                        {values.Number_of_Disabilities_in_the_Family > 0 && (
                            <div className="row my-3">
                                <FieldArray
                                    name="Disabilities_description"
                                    render={(arrayHelpers) => (
                                        <div>
                                            {values.Disabilities_description.map((_, index) => (
                                                <div key={index} className="mb-3">
                                                    <label htmlFor={`Disabilities_description.${index}`} className="form-label">
                                                        Description of Disability {index + 1} <span className="text-danger"> * </span>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`Disabilities_description.${index}`}
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name={`Disabilities_description.${index}`}
                                                        component="div"
                                                        className="text-danger mt-1"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
                            </div>
                        )}

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

export default HealthStatus;
