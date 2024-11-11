import * as Yup from 'yup';
// Login Validation Schema
export const loginScheme = Yup.object().shape({
   email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
   password: Yup.string()
      .required('Password is required')
      .min(6, 'Your password must have at least 8 characters')
});
// Registration Validation Schema
export const registrationScheme = Yup.object({
   username: Yup.string().required('username is required'),
   email: Yup.string().email('Invalid email format').required('Email is required'),
   password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, 'Password must contain at least one letter and one number')
      .required('Password is required'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')  // Check if confirmPassword matches password
      .required('Confirm Password is required'),
   first_name: Yup.string().required('First Name is required'),
   last_name: Yup.string().required('Last Name is required'),
   phoneNumber: Yup.string()
      .matches(/^\d{9}$/, 'Phone number must have 9 digits')
      .required('Phone number is required'),
});

export const addAdvertiser = Yup.object({
   username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must have at least 3 characters')
      .max(20, 'Username must have at most 20 characters'),
   email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
   password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, 'Password must contain at least one letter and one number')
      .required('Password is required'),
   organization_name: Yup.string()
      .required('Organization name is required')
      .min(3, 'Organization name must have at least 3 characters'),
   phoneNumber: Yup.string()
      .matches(/^\d{9}$/, 'Phone number must have 9 digits')
      .required('Phone number is required'),
});
export const editAdvertiser = Yup.object({
   email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
   username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must have at least 3 characters')
      .max(20, 'Username must have at most 20 characters'),
   organization_name: Yup.string()
      .required('Organization name is required')
      .min(3, 'Organization name must have at least 3 characters'),
});
export const addFeedback = Yup.object({
   name: Yup.string().required('Name is required'),
   email: Yup.string().email('Invalid email address').required('Email is required'),
   role: Yup.string().required('Role is required'),
   content: Yup.string().required('content is required').min(5, 'content must have at least 5 characters'),
   rating: Yup.string().required('Rating is required').min(1, 'Please select a rating'),
});
