import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Typography, Box, Tab, Tabs, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import PageContainer from './PageContainer';
import axios from 'axios';
import GeneralInformation from './GeneralInformation';
import FamilyInformation from './FamilyInformation';
import EducationalData from './EducationalData';
import HealthStatus from './HealthStatus';
import Identifiers from './Identifiers';
import Attachments from './Attachments';
import Swal from 'sweetalert2';
import moment from 'moment';
import { toast } from 'react-toastify';

const ApplicationDetails = () => {
  const { _id } = useParams();
  const [application, setApplication] = useState(null);
  const [studentData, setStudent] = useState(null);


  const location = useLocation();
  const { seatsAvailable, acceptedCount, deadline } = location.state || {};
  // console.log(seatsAvailable);
  // console.log(acceptedCount);
  console.log(_id)


  useEffect(() => {
    const fetchApplicationAndStudent = async () => {
      try {
        // First API call to get the application details
        const applicationResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/applications/${_id}`);
        const applicationData = applicationResponse.data;
        setApplication(applicationData);
        // console.log('Application Data:', applicationData);

        // Extract student_id from the application data
        const studentId = applicationData.student_id;

        // Second API call to get the student details using student_id
        const studentResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getStudentDataFromId/${studentId}`);
        setStudent(studentResponse.data);
        // console.log('Student Data:', studentData);

      } catch (error) {
        console.error('Error fetching application or student details:', error);
      }
    };

    fetchApplicationAndStudent();
  }, [_id]);

  const handleStatusUpdate = (status, seatsAvailable, acceptedCount) => {
    const currentDate = Date();

    // Check if the current date is before the deadline
    // console.log(currentDate < deadline)

    if (currentDate < deadline) {
      Swal.fire({
        title: 'Cannot update before deadline',
        text: 'You cannot change the application status before the deadline.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
      return; // Prevent the status update
    }
    // Calculate the remaining seats
    const remainingSeats = seatsAvailable - acceptedCount;

    if (status === "accept") {
      // Check if there are remaining seats before proceeding
      if (remainingSeats > 0) {
        // Confirm before accepting the application
        Swal.fire({
          title: 'Are you sure?',
          text: `You are about to change the application status to "Accept". ${remainingSeats} seats are still available.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, accept it!',
          cancelButtonText: 'Cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            // If confirmed, send the patch request to update the status
            axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/applications/${_id}/${status}`)
              .then(() => {
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
      } else {
        // If no seats are available
        Swal.fire({
          title: 'No seats available',
          text: "There are no available seats left to accept more students.",
          icon: 'error',
          confirmButtonText: 'Close'
        });
      }
    } else if (status === "accept" && remainingSeats === 1) {
      // Special confirmation for the last seat
      Swal.fire({
        title: 'Last seat available!',
        text: `You are about to accept the last seat. Proceed with caution.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, accept it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/applications/${_id}/${status}`)
            .then(() => {
              setApplication(prev => ({ ...prev, status }));

              Swal.fire(
                'Updated!',
                `The application status has been updated to "${status}".`,
                'success'
              );
            })
            .catch(error => {
              console.error('Error updating application status', error);
              Swal.fire(
                'Failed!',
                'There was an issue updating the application status. Please try again.',
                'error'
              );
            });
        } else {
          Swal.fire(
            'Cancelled',
            'The application status update was cancelled.',
            'info'
          );
        }
      });
    } else {
      // Handle other status updates (e.g., reject) with the standard confirmation
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
          // Send the patch request to update the status
          axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/applications/${_id}/${status}`)
            .then(() => {
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
    }
  };



  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const [open, setOpen] = useState(false);
  const [evaluation, setEvaluation] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/applications/${_id}/evaluate`,
        { evaluation }, // Request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Application evaluated successfully:", response.data);
      toast.success("Evaluation submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setOpen(false); // Close the modal
      setEvaluation(''); // Clear the input field
    } catch (error) {
      console.error("Error evaluating application:", error);
      toast.error(
        error.response && error.response?.data
          ? `Failed: ${error.response}`
          : "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
    setOpen(false); // Close the modal after submission
  };


  return (
    <PageContainer
      breadcrumbs={<Typography>Dashboard / Scholarships / Applications / Application Details</Typography>}
      actions={
        <>
          <>
            {application && application.status === "pending" && (
              <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#45a049",
                    },
                    // marginRight: 2,
                  }}
                  onClick={() => handleStatusUpdate("accept", seatsAvailable, acceptedCount, deadline)}
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
                  onClick={() => handleStatusUpdate("reject", seatsAvailable, acceptedCount, deadline)}
                >
                  Reject
                </Button>
              </Box>
            )}
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2196F3",
                  "&:hover": {
                    backgroundColor: "#1976D2",
                  },
                  marginTop: '15px',
                  width: '100%'
                }}
                onClick={handleOpen}
              >Evaluate</Button>
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" sx={{ overflow: 'hidden' }}>
              <DialogTitle>Write Your Evaluation</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  rows={4}
                  label="Evaluation"
                  variant="outlined"
                  value={evaluation}
                  onChange={(e) => setEvaluation(e.target.value)}
                  autoFocus
                  sx={{ marginTop: '10px' }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </>
        </>
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
          {currentTab === 0 && application && studentData && (<GeneralInformation data={{ application, studentData }} />)}
          {currentTab === 1 && application && (<FamilyInformation data={{ application }} />)}
          {currentTab === 2 && application && (<EducationalData data={{ application }} />)}
          {currentTab === 3 && application && (<HealthStatus data={{ application }} />)}
          {currentTab === 4 && application && (<Identifiers data={{ application }} />)}
          {currentTab === 5 && application && (<Attachments data={{ application }} />)}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ApplicationDetails;
