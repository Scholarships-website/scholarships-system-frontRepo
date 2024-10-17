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

//  export const addTrainer = yup.object({
//     email:yup.string().required('Email is required').email('Please enter a valid email address'),
//     password:yup.string().required('Password is required').min(6,'your Password must have at least 6 characters').max(30,'your Password must have at most 30 characters'),
//     firstName:yup.string().required('First name is required'),
//     lastName:yup.string().required('Last name is required'),
//  })
//  export const addTraining = yup.object({
//    name:yup.string().required('name is required'),
//    description:yup.string().required('description is required'),
// })
//  export const editTrainer = yup.object({
//     email:yup.string().required('Email is required').email('Please enter a valid email address'),
//     firstName:yup.string().required('First name is required'),
//     lastName:yup.string().required('Last name is required'),
//     bio:yup.string().required('Bio is required'),
//  })
//  export const editTraining = yup.object({
//    name:yup.string().required('Training name is required'),
//    description:yup.string().required('Description is required'),
// })
//  export const editTrainee = yup.object({
//    email:yup.string().required('Email is required').email('Please enter a valid email address'),
//    firstName:yup.string().required('First name is required'),
//    lastName:yup.string().required('Last name is required'),
// })

//  export const addTrainee = yup.object({
//     email:yup.string().required('Email is required').email('Please enter a valid email address'),
//     password:yup.string().required('Password is required').min(6,'your Password must have at least 6 characters').max(30,'your Password must have at most 30 characters'),
//     firstName:yup.string().required('First name is required'),
//     lastName:yup.string().required('Last name is required'),
//  })