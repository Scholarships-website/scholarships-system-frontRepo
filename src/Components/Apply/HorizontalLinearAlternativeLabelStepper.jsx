import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const HorizontalLinearAlternativeLabelStepper = ({ currentStep, steps }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Define small screen breakpoint

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "70px",
        overflowX: isSmallScreen ? "auto" : "visible", // Enable horizontal scroll on small screens
      }}
    >
      <Stepper
        activeStep={currentStep - 1}
        alternativeLabel={!isSmallScreen} // Horizontal labels for larger screens
        orientation={isSmallScreen ? "vertical" : "horizontal"} // Switch orientation based on screen size
        sx={{
          width: "100%",
        }}
      >
        {steps.map((step) => (
          <Step key={step.id}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default HorizontalLinearAlternativeLabelStepper;
