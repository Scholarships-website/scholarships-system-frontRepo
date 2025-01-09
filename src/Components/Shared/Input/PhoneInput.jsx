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
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If countryCode is selected, combine it with phoneNumber
    if (name === 'countryCode') {
      const phoneInput = document.querySelector('.phone-number-input');
      const fullPhoneNumber = `${value}${phoneInput.value}`;
      onChange({
        target: {
          name: 'phoneNumber',
          value: fullPhoneNumber,
        },
      });
    } else {
      onChange(e);
    }
  };

  return (
    <>
      <div className={`phone-input-container form-floating ${colSize} mb-3`}>
        <select
          className="country-code-dropdown form-control"
          onChange={handleChange}
          onBlur={onBlur}
          name="countryCode"
          defaultValue={countryCode}
          colSize='col-md-12'
        >
          <option value="+970">+970</option>
          <option value="+972">+972</option>
        </select>

        <input
          type="text"
          name="phoneNumber"
          id={id}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          className={`phone-number-input form-control ${errors.phoneNumber && touched.phoneNumber ? 'input-error' : ''
            }`}
          placeholder="Enter phone number"
          colSize = 'col-md-12'
        />

        <label htmlFor={id}>
          {title}
          {required && (
            <span
              className="text-danger"
              style={{
                position: 'absolute',
                right: '15px',
                top: '20px',
              }}
            >
              *
            </span>
          )}
        </label>
        <div>
          <br />
        </div>
        
      
      </div>
      
      {errors.phoneNumber && touched.phoneNumber && (
        <div className="error-message text-danger">{errors.phoneNumber}</div>
      )}

      
    </>
  );
};

export default PhoneInput;
