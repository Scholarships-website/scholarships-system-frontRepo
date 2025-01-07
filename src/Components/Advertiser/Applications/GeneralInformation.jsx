import React from "react";
import { Box, Typography, Grid, Card, CardContent, Divider } from "@mui/material";
import moment from "moment";

const GeneralInformation = ({ data  }) => {
    const { application, studentData } = data; // Destructure application and studentData from the data prop
    // console.log(application);
    // console.log(studentData);
    // data = {
    //     fullName: "John Doe",
    //     idNumber: "123456789",
    //     cardType: "National ID",
    //     dob: "1995-05-15",
    //     gender: "Male",
    //     maritalStatus: "Single",
    //     permanentResidence: "123 Main Street, Springfield",
    //     province: "Central Province",
    //     street: "Elm Street",
    //     phoneNumber: "+1234567890",
    //     temporaryAddress: "456 Oak Avenue, Metropolis",
    //     currentAccommodation: "Rented Apartment",
    //     studentType: "Full-time",
    //     academicProgram: "Bachelor of Science in Computer Science",
    //     college: "Engineering and Technology",
    //     specialization: "Artificial Intelligence",
    //     stream: "Science"
    // };
    return (
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {/* Full Name */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Full Name:</Typography>
                        <Typography variant="body2" color="textSecondary">{studentData.fullname || "N/A"}</Typography>
                    </Box>

                    {/* ID Number */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>ID Number:</Typography>
                        <Typography variant="body2" color="textSecondary">{application.ID_Number || "N/A"}</Typography>
                    </Box>

                    {/* Card Type */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Card Type:</Typography>
                        <Typography variant="body2" color="textSecondary">{application.Card_Type || "N/A"}</Typography>
                    </Box>

                    {/* Date of Birth */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Date of Birth:</Typography>
                        <Typography variant="body2" color="textSecondary">{moment(studentData.birthdate).format('YYYY-MM-DD')} </Typography>
                    </Box>

                    {/* Gender */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Gender:</Typography>
                        <Typography variant="body2" color="textSecondary">{studentData.gender || "N/A"}</Typography>
                    </Box>

                    {/* Marital Status */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Marital Status:</Typography>
                        <Typography variant="body2" color="textSecondary">{application.Martial_Status || "N/A"}</Typography>
                    </Box>

                    {/* Permanent Residence */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Permanent Residence:</Typography>
                        <Typography variant="body2" color="textSecondary">{application.Permanent_Residence || "N/A"}</Typography>
                    </Box>

                    {/* Province */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Province:</Typography>
                        <Typography variant="body2" color="textSecondary">{application.province || "N/A"}</Typography>
                    </Box>

                    {/* Street */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Street:</Typography>
                        <Typography variant="body2" color="textSecondary">{application.street || "N/A"}</Typography>
                    </Box>

                    {/* Phone Number */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
                        <Typography variant="body2" color="textSecondary">{studentData.phoneNumber || "N/A"}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GeneralInformation;
