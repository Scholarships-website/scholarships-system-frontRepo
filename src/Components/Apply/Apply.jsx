import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom"; // For extracting the scholarship ID from the URL
import GeneralInfo from "./GeneralInfo";
import FamilyInfo from "./FamilyInfo";
import EducationalData from "./EducationalData";
import HealthStatus from "./HealthStatus";
import Identifiers from "./Identifiers";
import Attachments from "./Attachments";
import StepNavigation from "./StepNavigation";
import HorizontalLinearAlternativeLabelStepper from "./HorizontalLinearAlternativeLabelStepper";
import Navbar from "../Shared/Navbar/Navbar";
import "./Apply.css";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

const Apply = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const {userToken } = useContext(UserContext);

  const [formData, setFormData] = useState({
    generalInfo: {
      ID_Number: "",
      Card_Type: "",
      Martial_Status: "",
      Permanent_Residence: "",
      province: "",
      street: "",
      phoneNumber: "",
      temporaryAddress: "",
      currentAccommodation: "",
      student_type: "",
      academic_program: "",
      college: "",
      major: "",
      stream: "",
    },
    familyInfo: {
      Head_of_the_family: "",
      breadwinner: "",
      breadwinner_id: "",
      work_nature: "",
      institution: "",
      income_category: "",
      Does_mother_work: "",
      any_other_income: "",
      Total_number_of_family_members: "",
      Does_student_work: "",
      social_affairs_case: "",
      UNRWA_card: "",
    },
    educationalData: {
      Study_Level: "",
      GPA: "",
      university_year: "",
      class_year: "",
      Number_of_Siblings: "",
    },
    healthStatus: {
      Number_of_Disabilities_in_the_Family: "",
    },
    identifiers: {
      identifier_Name1: "",
      identifier_phone1:"",
      identifier_profession1:"",
      identifier_Name2: "",
      identifier_phone2: "",
      identifier_profession2: "",
      identifier_Name3: "",
      identifier_phone3: "",
      identifier_profession3: "",
    },
    pdffiles: {
      Student_ID_Image: null,
      Head_of_Household_ID_Image: null,
      Mother_ID_Image:null,
      Sibling_ID_Image: null,
      Special_Cases_Report: null,
    },
  });

  // Save data for each step
  const saveStepData = (stepData) => {
    setFormData((prev) => ({
      ...prev,
      [stepData.stepKey]: stepData.data, // Dynamically save data based on step
    }));
  };

  const steps = [
    {
      id: 1,
      label: "General Information",
      component: (
        <GeneralInfo
          formData={formData.generalInfo}
          setFormData={setFormData}
          saveStepData={saveStepData}
        />
      ),
    },
    {
      id: 2,
      label: "Family Information",
      component: (
        <FamilyInfo
          formData={formData.familyInfo}
          setFormData={setFormData}
          saveStepData={saveStepData}
        />
      ),
    },
    {
      id: 3,
      label: "Educational Data",
      component: (
        <EducationalData
          formData={formData.educationalData}
          setFormData={setFormData}
          saveStepData={saveStepData}
        />
      ),
    },
    {
      id: 4,
      label: "Health Status",
      component: (
        <HealthStatus
          formData={formData.healthStatus}
          setFormData={setFormData}
          saveStepData={saveStepData}
        />
      ),
    },
    {
      id: 5,
      label: "Identifiers",
      component: (
        <Identifiers
          formData={formData.identifiers}
          setFormData={setFormData}
          saveStepData={saveStepData}
        />
      ),
    },
    {
      id: 6,
      label: "Attachments",
      component: (
        <Attachments
          formData={formData.pdffiles}
          setFormData={setFormData}
          saveStepData={saveStepData}
        />
      ),
    },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();

    // Append structured data for all steps
    formDataToSubmit.append("generalInfo", JSON.stringify(formData.generalInfo));
    formDataToSubmit.append("familyInfo", JSON.stringify(formData.familyInfo));
    formDataToSubmit.append("educationalData", JSON.stringify(formData.educationalData));
    formDataToSubmit.append("healthStatus", JSON.stringify(formData.healthStatus));
    formDataToSubmit.append("identifiers", JSON.stringify(formData.identifiers));

    // Append attachments
    Object.entries(formData.pdffiles).forEach(([key, file]) => {
      if (file) { // Only add if the file is not null
        formDataToSubmit.append(`pdffiles[${key}]`, file);
      }
    });

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/scholarships/${id}/apply`,
        formDataToSubmit, // FormData object
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Token for authentication
            'Content-Type': 'multipart/form-data', // Explicitly specify multipart/form-data
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      const result = await response.json();
      alert("Application submitted successfully!");
      console.log(result);
    } catch (error) {
      console.error("Error submitting application:", error.message);
      alert("Failed to submit application: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="apply-container mt-5">
        <header className="apply-header">
          <h1>Scholarship Application</h1>
        </header>

        <HorizontalLinearAlternativeLabelStepper
          currentStep={currentStep}
          steps={steps}
        />

        <div className="step-content">{steps[currentStep - 1].component}</div>

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
