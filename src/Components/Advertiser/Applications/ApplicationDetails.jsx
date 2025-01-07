import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box, Tab, Tabs } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';
import GeneralInformation from './GeneralInformation';
import FamilyInformation from './FamilyInformation';
import EducationalData from './EducationalData';
import HealthStatus from './HealthStatus';
import Identifiers from './Identifiers';
import Attachments from './Attachments';
import Swal from 'sweetalert2';

const ApplicationDetails = () => {
  const { _id } = useParams();
  const [application, setApplication] = useState(null);
  const [studentData, setStudent] = useState(null);

  useEffect(() => {
    const fetchApplicationAndStudent = async () => {
      try {
        // First API call to get the application details
        const applicationResponse = await axios.get(`http://localhost:3000/api/v1/students/applications/${_id}`);
        const applicationData = applicationResponse.data;
        setApplication(applicationData);
        // console.log('Application Data:', applicationData);

        // Extract student_id from the application data
        const studentId = applicationData.student_id;

        // Second API call to get the student details using student_id
        const studentResponse = await axios.get(`http://localhost:3000/api/v1/getStudentDataFromId/${studentId}`);
        setStudent(studentResponse.data);
        // console.log('Student Data:', studentData);

      } catch (error) {
        console.error('Error fetching application or student details:', error);
      }
    };

    fetchApplicationAndStudent();
  }, [_id]);

  const handleStatusUpdate = (status) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to change the application status to "${status}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, send the patch request to update the status
        axios.patch(`http://localhost:3000/api/v1/applications/${_id}/${status}`)
          .then(() => {
            // Update application status in state
            setApplication(prev => ({ ...prev, status }));
  
            // Show success alert after status is updated
            Swal.fire(
              'Updated!',
              `The application status has been updated to "${status}".`,
              'success'
            );
          })
          .catch(error => {
            console.error('Error updating application status', error);
  
            // Show error alert if the request fails
            Swal.fire(
              'Failed!',
              'There was an issue updating the application status. Please try again.',
              'error'
            );
          });
      } else {
        // If the user cancels the action
        Swal.fire(
          'Cancelled',
          'The application status update was cancelled.',
          'info'
        );
      }
    });
  };
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <PageContainer
      breadcrumbs={<Typography>Dashboard / Scholarships / Applications / Application Details</Typography>}
      actions={
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#45a049",
              },
              marginRight: 2,
            }}
            onClick={() => handleStatusUpdate("accept")}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F44336",
              "&:hover": {
                backgroundColor: "#e53935",
              },
            }}
            onClick={() => handleStatusUpdate("reject")}
          >
            Reject
          </Button>
        </Box>
      }
    >
      <Box sx={{ width: "100%", mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Application Details
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="General Information" />
          <Tab label="Family Information" />
          <Tab label="Educational Data" />
          <Tab label="Health Status" />
          <Tab label="Identifiers" />
          <Tab label="Attachments" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {currentTab === 0 && application && studentData && (<GeneralInformation data={{application,studentData}} /> )}
          {currentTab === 1 && application && (<FamilyInformation data={{application}} />)}
          {currentTab === 2 && application && ( <EducationalData data={{application}} />)}
          {currentTab === 3 && application && (<HealthStatus data={{application}} />)}
          {currentTab === 4 && application && (<Identifiers data={{application}} />)}
          {currentTab === 5 && application && (<Attachments data={{application}} />)}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ApplicationDetails;
