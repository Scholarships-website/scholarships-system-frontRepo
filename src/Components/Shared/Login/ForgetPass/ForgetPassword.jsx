import React, { useState } from 'react';
import RequestResetPassword from './RequestResetPassword';
import VerifyCode from './VerifyCode';
import ResetPassword from './ResetPassword';
import './ForgetPass.css';
function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');

    const handleNextStep = (emailFromRequest = null) => {
        if (emailFromRequest) setEmail(emailFromRequest);
        setStep(step + 1);
    };

    return (
        <div>
            {step === 1 && <RequestResetPassword onNext={handleNextStep} />}
            {step === 2 && <VerifyCode email={email} onNext={handleNextStep} />}
            {step === 3 && <ResetPassword email={email} />}
        </div>
    );
}

export default ForgotPassword;
