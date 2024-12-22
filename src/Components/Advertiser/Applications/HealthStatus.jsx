import React from "react";
import { Card, Typography, Box } from "@mui/material";

const HealthStatus = ({ data }) => {
    data = {
        familyDisabilities: 2,   // Number of disabilities in the family
        healthDetails: "Mother has a chronic illness, and the student has asthma."
      };
    return (
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
            <Box display="flex" flexWrap="wrap" gap={3}>
                {/* Family Disabilities */}
                <Box sx={{ width: "45%" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Family Disabilities:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {data.familyDisabilities || "N/A"}
                    </Typography>
                </Box>

                {/* Health Details */}
                <Box sx={{ width: "45%" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Health Details:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {data.healthDetails || "N/A"}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default HealthStatus;
