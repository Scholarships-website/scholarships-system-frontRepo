// PhoneInput.js
import React from 'react';
import './PhoneInput.css';

const PhoneInput = ({ value, onChange, onBlur, errors, touched, countryCode }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;

        // If countryCode is selected, combine it with phoneNumber
        if (name === "countryCode") {
            const phoneInput = document.querySelector('.phone-number-input');
            const fullPhoneNumber = `${value}${phoneInput.value}`;
            onChange({
                target: {
                    name: "phoneNumber",
                    value: fullPhoneNumber
                }
            });
        } else {
            onChange(e);
        }
    };

    return (<>
        <div className="phone-input-container">
            <select
                className="country-code-dropdown"
                onChange={handleChange}
                onBlur={onBlur}
                name="countryCode"
                defaultValue={countryCode} // Set the default value to current countryCode
            >
                <option value="+970">+970</option>
                <option value="+972">+972</option>
            </select>
            <input
                type="text"
                name="phoneNumber"
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                className={`phone-number-input ${errors.phoneNumber && touched.phoneNumber ? 'input-error' : ''}`}
                placeholder="phone number"
            />

        </div>{errors.phoneNumber && touched.phoneNumber && (
            <div className="error-message text-danger">{errors.phoneNumber}</div>
        )}</>
    );
};

export default PhoneInput;
