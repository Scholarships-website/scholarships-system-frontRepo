import React from "react";
import { Card, Typography, Box } from "@mui/material";

const EducationalData = ({ data }) => {
    data = {
        studyLevel: "Bachelor's",
        gpa: 3.75,
        universityYear: "Sophomore",
        schoolClass: "Class A",
        siblingsInUniversity: 2
      };
      
  return (
    <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Study Level */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Study Level:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.studyLevel || "N/A"}
          </Typography>
        </Box>

        {/* GPA */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            GPA:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.gpa || "N/A"}
          </Typography>
        </Box>

        {/* University Year */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            University Year:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.universityYear || "N/A"}
          </Typography>
        </Box>

        {/* School Class */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            School Class:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.schoolClass || "N/A"}
          </Typography>
        </Box>

        {/* Siblings in University */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Siblings in University:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.siblingsInUniversity || "N/A"}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default EducationalData;
