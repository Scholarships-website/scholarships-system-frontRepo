import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';

const FamilyInformation = ({ data }) => {
    data = {
        headOfFamily: "John Doe",
        breadwinnerName: "Jane Doe",
        breadwinnerID: "123456789",
        fatherWorkNature: "Engineer",
        institutionName: "XYZ Corporation",
        incomeCategory: "High",
        motherWorks: "Yes",
        otherIncome: "No",
        familyMembers: 5,
        studentWorks: "No",
        socialAffairsCase: "Yes",
        unrwaCard: "No"
    };

    return (
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {/* Head of Family */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Head of Family:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.headOfFamily || "N/A"}</Typography>
                    </Box>

                    {/* Breadwinner Name */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Breadwinner Name:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.breadwinnerName || "N/A"}</Typography>
                    </Box>

                    {/* Breadwinner ID */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Breadwinner ID:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.breadwinnerID || "N/A"}</Typography>
                    </Box>

                    {/* Father Work Nature */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Father Work Nature:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.fatherWorkNature || "N/A"}</Typography>
                    </Box>

                    {/* Institution Name */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Institution Name:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.institutionName || "N/A"}</Typography>
                    </Box>

                    {/* Income Category */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Income Category:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.incomeCategory || "N/A"}</Typography>
                    </Box>

                    {/* Does Mother Work */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Does Mother Work:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.motherWorks || "N/A"}</Typography>
                    </Box>

                    {/* Other Income */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Other Income:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.otherIncome || "N/A"}</Typography>
                    </Box>

                    {/* Number of Family Members */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Number of Family Members:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.familyMembers || "N/A"}</Typography>
                    </Box>

                    {/* Does Student Work */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Does Student Work:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.studentWorks || "N/A"}</Typography>
                    </Box>

                    {/* Social Affairs Case */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Social Affairs Case:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.socialAffairsCase || "N/A"}</Typography>
                    </Box>

                    {/* UNRWA Card */}
                    <Box sx={{ width: "48%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>UNRWA Card:</Typography>
                        <Typography variant="body2" color="textSecondary">{data.unrwaCard || "N/A"}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FamilyInformation;
