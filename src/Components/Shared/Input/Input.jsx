import React, { useState, useEffect } from 'react';
import './Input.css';
import { ErrorMessage } from 'formik';

export default function Input({
    type = 'text',
    name,
    id,
    title,
    onChange,
    onBlur,
    errors,
    touched,
    value, // Receiving value from Formik
    disabled,
    colSize = 'col-md-5'
}) {
    const [isFilled, setIsFilled] = useState(false); // State to track if the input is filled

    // UseEffect to monitor value changes and update filled state
    useEffect(() => {
        setIsFilled(value ? true : false); // If value is not empty, mark it as filled
    }, [value]);

    // Return null or undefined for form errors if no errors exist
    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    return (
        <div className={`form-floating ${colSize} mb-3`}>
            <input
                type={type}
                className={`form-control ${isFilled ? 'filled' : ''} ${errorMessage ? 'is-invalid' : ''}`}
                name={name}
                id={id}
                placeholder={title}
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                style={{ backgroundColor: isFilled ? '#e8f0fe' : '#f8f9fa' }} 
            />
            <label htmlFor={id}>{title}</label>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>
    );
}
