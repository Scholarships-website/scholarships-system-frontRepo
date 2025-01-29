import React from 'react';
import './PhoneInput.css';

const PhoneInput = ({
  value,
  title,
  name,
  id,
  onChange,
  onBlur,
  errors,
  touched,
  countryCode,
  required = false,
  colSize = 'col-md-12',
}) => {
  // Handle input change for both country code and phone number
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'countryCode') {
      onChange({
        target: {
          name: 'countryCode',
          value,
        },
      });

      // Ensure we update the phone number state correctly
      onChange({
        target: {
          name: 'phoneNumber',
          value: value + (value ? value.replace(/^\+\d+/, '') : ''),
        },
      });
    } else {
      // Only update the phone number, keeping the country code separate
      onChange({
        target: {
          name: 'phoneNumber',
          value: value.replace(/^\+\d+/, ''), // Remove any accidental country codes
        },
      });
    }
  };

  return (
    <>
      <div className={`phone-input-container form-floating ${colSize} mb-3`}>
        {/* Country Code Select */}
        <select
          className="country-code-dropdown form-control"
          onChange={handleChange}
          onBlur={onBlur}
          name="countryCode"
          value={countryCode} // Controlled input
        >
          <option value="+970">+970</option>
          <option value="+972">+972</option>
        </select>

        {/* Phone Number Input */}
        <input
          type="text"
          name="phoneNumber"
          id={id}
          value={value.replace(/^\+\d+/, '')} // Ensure only phone number is displayed
          onChange={handleChange}
          onBlur={onBlur}
          className={`phone-number-input form-control ${
            errors.phoneNumber && touched.phoneNumber ? 'input-error' : ''
          }`}
          placeholder="Enter phone number"
        />

        {/* Label with Required Asterisk */}
        <label htmlFor={id}>
          {title}
          {required && (
            <span className="text-danger" style={{ position: 'absolute', right: '15px', top: '20px' }}>
              *
            </span>
          )}
        </label>
      </div>

      {/* Error Message */}
      {errors.phoneNumber && touched.phoneNumber && <div className="error-message text-danger">{errors.phoneNumber}</div>}
    </>
  );
};

export default PhoneInput;
