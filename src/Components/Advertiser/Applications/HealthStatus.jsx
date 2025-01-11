import React from "react";
import { Card, Typography, Box } from "@mui/material";

const HealthStatus = ({ data }) => {
    const { application } = data;

    return (
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
            <Box display="flex" flexWrap="wrap" gap={3}>
                {/* Family Disabilities */}
                <Box sx={{ width: "45%" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Family Disabilities:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {application.Number_of_Disabilities_in_the_Family || " 0 "}
                    </Typography>
                </Box>

                {/* Health Details */}
                <Box sx={{ width: "45%" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Health Details:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {application.Disabilities_description.length > 0
                            ? application.Disabilities_description.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))
                            : " "}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default HealthStatus;
