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
    value,
    disabled,
    colSize = 'col-md-5',
    options = []  // For select options
}) {
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        setIsFilled(value ? true : false);
    }, [value]);

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    // Render for select type
    if (type === 'select') {
        return (
            <div className={`form-floating ${colSize} mb-3`}>
                <select
                    className={`form-select form-control ${errorMessage ? 'is-invalid' : ''}`}
                    name={name}
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    aria-label={title}
                >
                    <option value="">Select {title}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label htmlFor={id}>{title}</label>
                {errorMessage && <div className="text-danger">{errorMessage}</div>}
            </div>
        );
    }

    // Default behavior for input type
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
