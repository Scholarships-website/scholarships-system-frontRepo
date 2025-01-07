import React from "react";
import { Card, Typography, Box } from "@mui/material";

const Identifiers = ({ data }) => {
    const { application } = data;

    // data = {
    //     name1: "John Doe",
    //     phone1: "+123456789",
    //     profession1: "Teacher",

    //     name2: "Jane Smith",
    //     phone2: "+987654321",
    //     profession2: "Engineer",

    //     name3: "Robert Brown",
    //     phone3: "+555555555",
    //     profession3: "Doctor",
    // };

    return (
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
            {/* Identifier 1 */}
            <Box mb={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Identifier 1:
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="textSecondary">
                        Name: {application.identifier_Name[0] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Phone: {application.identifier_Phone[0] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Profession: {application.identifier_profession[0] || "N/A"}
                    </Typography>
                </Box>
            </Box>

            {/* Identifier 2 */}
            <Box mb={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Identifier 2:
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="textSecondary">
                        Name: {application.identifier_Name[1] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Phone: {application.identifier_Phone[1] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Profession: {application.identifier_profession[1] || "N/A"}
                    </Typography>
                </Box>
            </Box>

            {/* Identifier 3 */}
            <Box mb={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Identifier 3:
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="textSecondary">
                        Name: {application.identifier_Name[2] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Phone: {application.identifier_Phone[2] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Profession: {application.identifier_profession[2] || "N/A"}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default Identifiers;
