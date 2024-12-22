import React from "react";
import { Box, Typography, Grid, Card, CardContent, Divider } from "@mui/material";

const GeneralInformation = ({ data }) => {
    data = {
        fullName: "John Doe",
        idNumber: "123456789",
        cardType: "National ID",
        dob: "1995-05-15",
        gender: "Male",
        maritalStatus: "Single",
        permanentResidence: "123 Main Street, Springfield",
        province: "Central Province",
        street: "Elm Street",
        phoneNumber: "+1234567890",
        temporaryAddress: "456 Oak Avenue, Metropolis",
        currentAccommodation: "Rented Apartment",
        studentType: "Full-time",
        academicProgram: "Bachelor of Science in Computer Science",
        college: "Engineering and Technology",
        specialization: "Artificial Intelligence",
        stream: "Science"
    };
    return (
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {/* Full Name */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Full Name:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.fullName || "N/A"}</Typography>
                    </Box>

                    {/* ID Number */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>ID Number:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.idNumber || "N/A"}</Typography>
                    </Box>

                    {/* Card Type */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Card Type:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.cardType || "N/A"}</Typography>
                    </Box>

                    {/* Date of Birth */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Date of Birth:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.dob || "N/A"}</Typography>
                    </Box>

                    {/* Gender */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Gender:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.gender || "N/A"}</Typography>
                    </Box>

                    {/* Marital Status */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Marital Status:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.maritalStatus || "N/A"}</Typography>
                    </Box>

                    {/* Permanent Residence */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Permanent Residence:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.permanentResidence || "N/A"}</Typography>
                    </Box>

                    {/* Province */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Province:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.province || "N/A"}</Typography>
                    </Box>

                    {/* Street */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Street:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.street || "N/A"}</Typography>
                    </Box>

                    {/* Phone Number */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.phoneNumber || "N/A"}</Typography>
                    </Box>

                    {/* Temporary Address */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Temporary Address:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.temporaryAddress || "N/A"}</Typography>
                    </Box>

                    {/* Current Accommodation */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Current Accommodation:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.currentAccommodation || "N/A"}</Typography>
                    </Box>

                    {/* Student Type */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Student Type:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.studentType || "N/A"}</Typography>
                    </Box>

                    {/* Academic Program */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Academic Program:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.academicProgram || "N/A"}</Typography>
                    </Box>

                    {/* College */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>College:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.college || "N/A"}</Typography>
                    </Box>

                    {/* Specialization */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Specialization:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.specialization || "N/A"}</Typography>
                    </Box>

                    {/* Stream */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Stream:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.stream || "N/A"}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GeneralInformation;
