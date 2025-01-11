import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalLinearAlternativeLabelStepper from "../../../Apply/HorizontalLinearAlternativeLabelStepper";
import { UserContext } from "../../../../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";
import GeneralInformation from "./GeneralInformation";
import FamilyInformation from "./FamilyInformation";
import EducationalData from "./EducationalData";
import HealthStatus from "./HealthStatus";
import Identifiers from "./Identifiers";
import Attachments from "./Attachments";
import "../../../Apply/Apply.css";



const EditApp = () => {
  const { scholarship_id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { userToken, roleId } = useContext(UserContext);
  const [applicationDetails, setApplicationDetails] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { application, student } = location.state || {};
  const navigate = useNavigate();
  useEffect(() => {
    if (!application || !student) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [application, student]);


  const [formData, setFormData] = useState({
    generalInfo: {
      fullname: student?.fullname || "",
      birthdate: student.birthdate || "",
      gender: student.gender || "",
      ID_Number: application.ID_Number || "",
      Card_Type: application.Card_Type || "",
      Martial_Status: application.Martial_Status || "",
      Permanent_Residence: application.Permanent_Residence || "",
      province: application.province || "",
      street: application.street || "",
      phoneNumber: student.phoneNumber || "",
    },
    familyInfo: {
      Head_of_the_family: application.Head_of_the_family || "",
      breadwinner: application.breadwinner || "",
      breadwinner_id: application.breadwinner_id || "",
      work_nature: application.work_nature || "",
      institution: application.institution || "",
      income_category: application.income_category || "",
      Does_mother_work: application.Does_mother_work || "",
      any_other_income: application.any_other_income || "",
      Total_number_of_family_members: application.Total_number_of_family_members || "",
      Does_student_work: application.Does_student_work || "",
      social_affairs_case: application.social_affairs_case || "",
      UNRWA_card: application.UNRWA_card || "",
    },
    educationalData: {
      GPA: application.GPA || "",
      university_year: application.university_year || "",
      class_year: application.class_year || "",
      Number_of_Siblings: application.Number_of_Siblings || "",
      student_type: application.student_type || "",
      academic_program: application.academic_program || "",
      college: application.college || "",
      major: application.major || "",
      stream: application.stream || "",
    },
    healthStatus: {
      Number_of_Disabilities_in_the_Family: application.Number_of_Disabilities_in_the_Family || "",
      Disabilities_description: application.Disabilities_description || ''
    },
    identifiers: {
      identifier_Name1: application.identifier_Name[0] || "",
      identifier_phone1: application.identifier_Phone[0] || "",
      identifier_profession1: application.identifier_profession[0] || "",
      identifier_Name2: application.identifier_Name[1] || "",
      identifier_phone2: application.identifier_Phone[1] || "",
      identifier_profession2: application.identifier_profession[1] || "",
      identifier_Name3: application.identifier_Name[2] || "",
      identifier_phone3: application.identifier_Phone[2] || "",
      identifier_profession3: application.identifier_profession[2] || "",
    },
    pdffiles: {
      Student_ID_Image: application.Student_ID_Image || null,
      Head_of_Household_ID_Image: application.Head_of_Household_ID_Image || null,
      Mother_ID_Image: application.Mother_ID_Image || null,
      Sibling_ID_Image: application.Sibling_ID_Image || null,
      Special_Cases_Report: application.Special_Cases_Report || null,
    },
  });





  const saveStepData = (stepData) => {
    setFormData((prev) => ({
      ...prev,
      [stepData.stepKey]: stepData.data,
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to edit your application. Do you want to proceed?',
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
          formDataToSubmit.append(key, file);
        });

        try {
          // Send the form data using axios

          const response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/students/applications/${application._id}/edit`,
            formDataToSubmit,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          console.log(response.data);
          toast.success("Application submitted successfully!");
          navigate('/studentDashboard/applications');

        } catch (error) {
          if (error.response) {
            console.error("Error response from server:", error.response.data);
            toast.error("Failed to submit application: " + (error.response.data));
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
        <GeneralInformation
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
        <FamilyInformation
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




  return (
    <>
      <header className="apply-header">
        <h1>Edit Application</h1>
      </header>
      <HorizontalLinearAlternativeLabelStepper
        currentStep={currentStep}
        steps={steps}
      />
      <div className="step-content">
        {loading ? (
          <Loading/>
        ) : (
          steps[currentStep - 1]?.component || "No content available"
        )}
      </div>
    </>
  );
};

export default EditApp;
