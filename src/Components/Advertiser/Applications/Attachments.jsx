import React from "react";
import { Card, Typography, Box, Link } from "@mui/material";

const Attachments = ({ data }) => {
    const { application } = data;
    console.log(application)
    // data = {
    //     studentIdImage: "path/to/studentIdImage.pdf",
    //     headOfHouseholdIdWithAnnex: "path/to/headOfHouseholdIdWithAnnex.pdf",
    //     motherIdImage: "path/to/motherIdImage.pdf",
    //     certificateForBrothers: "path/to/certificateForBrothers.pdf",
    //     specialCasesReport: "path/to/specialCasesReport.pdf",
    // };

    return (
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: "auto" }}>
            {/* Student ID Image */}
            <Box mb={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Student ID Image:
                </Typography>
                <Box mt={1}>
                    <Link href={application.Student_ID_Image} target="_blank" rel="noopener" color="primary">
                        View/Download PDF
                    </Link>
                </Box>
            </Box>

            {/* Head of Household ID with Annex */}
            <Box mb={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Head of Household ID with Annex:
                </Typography>
                <Box mt={1}>
                    <Link href={application.Head_of_Household_ID_Image} target="_blank" rel="noopener" color="primary">
                        View/Download PDF
                    </Link>
                </Box>
            </Box>

            {/* Mother ID Image */}
            <Box mb={2}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Mother ID Image:
                </Typography>
                <Box mt={1}>
                    <Link href={application.Mother_ID_Image} target="_blank" rel="noopener" color="primary">
                        View/Download PDF
                    </Link>
                </Box>
            </Box>

            {application.Sibling_ID_Image && application.Sibling_ID_Image.length > 0 && (
                <Box mb={2}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Certificate for Brothers:
                    </Typography>
                    <Box mt={1}>
                        <Link href={application.Sibling_ID_Image} target="_blank" rel="noopener" color="primary">
                            View/Download PDF
                        </Link>
                    </Box>
                </Box>
            )}

            {application.Special_Cases_Report && application.Special_Cases_Report !== null && (
                <Box mb={2}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Special Cases Report:
                    </Typography>
                    <Box mt={1}>
                        <Link href={application.Special_Cases_Report} target="_blank" rel="noopener" color="primary">
                            View/Download PDF
                        </Link>
                    </Box>
                </Box>
            )}
        </Card>
    );
};

export default Attachments;
