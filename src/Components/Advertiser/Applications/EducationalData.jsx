import React from "react";
import { Card, Typography, Box } from "@mui/material";

const EducationalData = ({ data }) => {
  const { application } = data;

  // data = {
  //     studyLevel: "Bachelor's",
  //     gpa: 3.75,
  //     universityYear: "Sophomore",
  //     schoolClass: "Class A",
  //     siblingsInUniversity: 2
  //   };

  return (
    <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Student Type */}
        <Box sx={{ width: "48%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Student Type:</Typography>
          <Typography variant="body2" color="textSecondary">{application.student_type || "N/A"}</Typography>
        </Box>

        {/* Academic Program */}
        <Box sx={{ width: "48%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Academic Program:</Typography>
          <Typography variant="body2" color="textSecondary">{application.academic_program || "N/A"}</Typography>
        </Box>

        {/* College */}
        <Box sx={{ width: "48%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>College:</Typography>
          <Typography variant="body2" color="textSecondary">{application.college || "N/A"}</Typography>
        </Box>

        {/* Specialization */}
        <Box sx={{ width: "48%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Major:</Typography>
          <Typography variant="body2" color="textSecondary">{application.major || "N/A"}</Typography>
        </Box>

        {/* Stream */}
        <Box sx={{ width: "48%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Stream:</Typography>
          <Typography variant="body2" color="textSecondary">{application.stream || "N/A"}</Typography>
        </Box>
        {/* GPA */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            GPA:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {application.GPA || "N/A"}
          </Typography>
        </Box>

        {/* University Year */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            University Year:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {application.university_year || "N/A"}
          </Typography>
        </Box>

        {/* School Class */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            School Class:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {application.class_year || "N/A"}
          </Typography>
        </Box>

        {/* Siblings in University */}
        <Box sx={{ width: "45%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Siblings in University:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {application.Number_of_Siblings || "N/A"}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default EducationalData;
