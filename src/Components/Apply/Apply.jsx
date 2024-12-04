import React, { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import FamilyInfo from "./FamilyInfo";
import EducationalData from "./EducationalData";
import HealthStatus from "./HealthStatus";
import Identifiers from "./Identifiers";
import Attachments from "./Attachments";
import StepNavigation from "./StepNavigation";
import HorizontalLinearAlternativeLabelStepper from "./HorizontalLinearAlternativeLabelStepper";
import "./Apply.css"; // Import the CSS file
import Navbar from '../Shared/Navbar/Navbar'
const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    generalInfo: {},
    familyInfo: {},
    educationalData: {},
    healthStatus: {},
    identifiers: [],
    attachments: [],
  });

  // Define the steps and components for each step
  const steps = [
    { id: 1, label: "General Information", component: <GeneralInfo formData={formData} setFormData={setFormData} /> },
    { id: 2, label: "Family Information", component: <FamilyInfo formData={formData} setFormData={setFormData} /> },
    { id: 3, label: "Educational Data", component: <EducationalData formData={formData} setFormData={setFormData} /> },
    { id: 4, label: "Health Status", component: <HealthStatus formData={formData} setFormData={setFormData} /> },
    { id: 5, label: "Identifiers", component: <Identifiers formData={formData} setFormData={setFormData} /> },
    { id: 6, label: "Attachments", component: <Attachments formData={formData} setFormData={setFormData} /> },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    console.log("Form Submitted", formData);
    // Add logic to send formData to the backend
  };

  return (
    <>
    <Navbar />
    <div className="apply-container mt-5">
      <header className="apply-header">
        <h1>Scholarship Application</h1>
      </header>
      
      {/* Stepper Navigation */}
      <HorizontalLinearAlternativeLabelStepper currentStep={currentStep} steps={steps} />

      <div className="step-content">
        {steps[currentStep - 1].component}
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        nextStep={nextStep}
        prevStep={prevStep}
        onSubmit={handleSubmit}
      />
    </div>
    </>
  );
};

export default Apply;
