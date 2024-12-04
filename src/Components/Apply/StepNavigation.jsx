import React from "react";
import PropTypes from "prop-types";

const StepNavigation = ({ currentStep, totalSteps, nextStep, prevStep, onSubmit }) => {
  return (
    <div className="container">
      <div className="step-navigation">
        <button
          type="button"
          className="prev-btn"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        {currentStep < totalSteps ? (
          <button type="button" className="next-btn" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button type="button" className="submit-btn" onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
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
