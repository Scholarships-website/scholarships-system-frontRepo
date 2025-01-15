import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../Shared/Loading/Loading";

const Apply = () => {
  const { scholarship_id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { userToken, roleId } = useContext(UserContext);
  const [applicationDetails, setApplicationDetails] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    generalInfo: {
      fullname: "",
      birthdate: "",
      Gender: "",
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
      identifier_phone1: "",
      identifier_profession1: "",
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
      Mother_ID_Image: null,
      Sibling_ID_Image: null,
      Special_Cases_Report: null,
    },
  });


  useEffect(() => {
    setLoading(true);
    const fetchApplicationDetails = async () => {
      try {
        const applicationsResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/${roleId}/applications`);
        const applicationIds = applicationsResponse.data;

        if (applicationIds.length > 0) {
          const firstApplicationId = applicationIds[0];
          const applicationDetailsResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/applications/${firstApplicationId}`);
          setApplicationDetails(applicationDetailsResponse.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching application details:', error);
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchApplicationDetails();
  }, [roleId]);


  // Save data for each step
  const saveStepData = (stepData) => {
    setFormData((prev) => ({
      ...prev,
      [stepData.stepKey]: stepData.data, // Dynamically save data based on step
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));



  const handleSubmit = async () => {
    // Display confirmation dialog using Swal
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to submit your application. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formDataToSubmit = new FormData();

        // Append fields from generalInfo
        Object.entries(formData.generalInfo).forEach(([key, value]) => {
          formDataToSubmit.append(key, value);
        });

        // Append fields from familyInfo
        Object.entries(formData.familyInfo).forEach(([key, value]) => {
          formDataToSubmit.append(key, value);
        });

        // Append fields from educationalData
        Object.entries(formData.educationalData).forEach(([key, value]) => {
          formDataToSubmit.append(key, value);
        });

        // Append fields from healthStatus
        Object.entries(formData.healthStatus).forEach(([key, value]) => {
          formDataToSubmit.append(key, value);
        });

        // Append fields from identifiers
        Object.entries(formData.identifiers).forEach(([key, value]) => {
          formDataToSubmit.append(key, value);
        });

 // Append files from pdffiles
 Object.entries(formData.pdffiles).forEach(([key, file]) => {
  if (file) {
    console.log(`Appending file: ${key}`, file); // Log the file being appended
    formDataToSubmit.append(key, file);

  } else {
    console.log(`File ${key} is null or undefined`); // Log if the file is missing
  }
});

// Log FormData contents
for (let [key, value] of formDataToSubmit.entries()) {
  console.log(key, value);
}
        try {
          // Send the form data using axios
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${scholarship_id}/apply`,
            formDataToSubmit,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          console.log(response.data);
          toast.success("Application submitted successfully!");  // Success toast
          navigate('/studentDashboard/applications');
        } catch (error) {
          if (error.response) {
            console.error("Error response from server:", error.response.data);
            toast.error("Failed to submit application: " + (error.response.data));  // Error toast
          } else if (error.request) {
            console.error("No response received:", error.request);
            toast.error("Failed to submit application: No response from server.");
          } else {
            // Other errors
            console.error("Error setting up request:", error.message);
            toast.error("Failed to submit application: " + error.message);
          }
        }
      } else {
        // If user cancels the submission
        toast.info("Application submission canceled.");
      }
    });
  };

  const steps = [
    {
      id: 1,
      label: "General Information",
      component: loading ? (
        <Loading />
      ) : (
        <GeneralInfo
          formData={formData.generalInfo}
          setFormData={setFormData}
          saveStepData={saveStepData}
          nextStep={nextStep}
          currentStep={1}
          totalSteps={6}
          prevStep={prevStep}
          {...(applicationDetails ? { applicationDetails } : {})}
        />
      ),
    },
    {
      id: 2,
      label: "Family Information",
      component: loading ? (
        <Loading />
      ) : (
        <FamilyInfo
          formData={formData.familyInfo}
          setFormData={setFormData}
          saveStepData={saveStepData}
          nextStep={nextStep}
          currentStep={2}
          totalSteps={6}
          prevStep={prevStep}
          {...(applicationDetails ? { applicationDetails } : {})}
        />
      ),
    },
    {
      id: 3,
      label: "Educational Data",
      component: loading ? (
        <Loading />
      ) : (
        <EducationalData
          formData={formData.educationalData}
          setFormData={setFormData}
          saveStepData={saveStepData}
          nextStep={nextStep}
          currentStep={3}
          totalSteps={6}
          prevStep={prevStep}
          {...(applicationDetails ? { applicationDetails } : {})}
        />
      ),
    },
    {
      id: 4,
      label: "Health Status",
      component: loading ? (
        <Loading />
      ) : (
        <HealthStatus
          formData={formData.healthStatus}
          setFormData={setFormData}
          saveStepData={saveStepData}
          nextStep={nextStep}
          currentStep={4}
          totalSteps={6}
          prevStep={prevStep}
          {...(applicationDetails ? { applicationDetails } : {})}
        />
      ),
    },
    {
      id: 5,
      label: "Identifiers",
      component: loading ? (
        <Loading />
      ) : (
        <Identifiers
          formData={formData.identifiers}
          setFormData={setFormData}
          saveStepData={saveStepData}
          nextStep={nextStep}
          currentStep={5}
          totalSteps={6}
          prevStep={prevStep}
          {...(applicationDetails ? { applicationDetails } : {})}
        />
      ),
    },
    {
      id: 6,
      label: "Attachments",
      component: loading ? (
        <Loading />
      ) : (
        <Attachments
          formData={formData.pdffiles}
          setFormData={setFormData}
          saveStepData={saveStepData}
          nextStep={nextStep}
          currentStep={6}
          totalSteps={6}
          prevStep={prevStep}
          onSubmit={handleSubmit}
          {...(applicationDetails ? { applicationDetails } : {})}
        />
      ),
    },
  ];
  useEffect(() => {
    if (currentStep === 6) { // Only trigger onSubmit on the Attachments step
      const areFilesUploaded = Object.values(formData.pdffiles).some(file => file !== null);
      if (areFilesUploaded) {
        handleSubmit();
      }
    }
  }, [formData.pdffiles, currentStep, handleSubmit]);



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
        <div className="step-content">
          {/* {console.log(steps)}
          {console.log("Current Step:", currentStep)} */}
          {steps[currentStep - 1]?.component || "No content available"}
        </div>
      </div>
    </>
  );
};

export default Apply;
