import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const HorizontalLinearAlternativeLabelStepper = ({ currentStep, steps }) => {
  return (
    <Box sx={{ width: '100%', marginTop: '70px' }}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
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
