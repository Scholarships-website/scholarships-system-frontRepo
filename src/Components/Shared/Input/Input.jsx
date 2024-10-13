import React, { useState, useEffect } from 'react';
import './Input.css';

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
    colSize = 'col-md-6'
}) {
    const [isFilled, setIsFilled] = useState(false); // State to track if the input is filled

    // UseEffect to monitor value changes
    useEffect(() => {
        if (value) {
            setIsFilled(true); // If there is a value, mark it as filled
        } else {
            setIsFilled(false); // If value is empty, mark it as not filled
        }
    }, [value]);

    return (
        <div className={`form-floating ${colSize} mb-3`}>
            <input
                type={type}
                className={`form-control ${isFilled ? 'filled' : ''} ${touched[name] && errors[name] ? 'is-invalid' : ''}`}
                name={name}
                id={id}
                placeholder={title}
                value={value}  // Controlled input with value from Formik
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                style={{ backgroundColor: isFilled ? '#e8f0fe' : '#f8f9fa' }} 
            />
            <label htmlFor={id}>{title}</label>
            {touched[name] && errors[name] && <p className="text-danger">{errors[name]}</p>}
        </div>
    );
}
