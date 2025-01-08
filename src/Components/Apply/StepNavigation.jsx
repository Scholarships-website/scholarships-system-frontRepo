import React from "react";
import PropTypes from "prop-types";

const StepNavigation = ({ currentStep, totalSteps, nextStep, prevStep, onSubmit }) => {
  return (
    <div className="container">

    </div>

  );
};

StepNavigation.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StepNavigation;
