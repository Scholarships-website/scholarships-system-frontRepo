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
export const addScholarship = Yup.object({
   scholarsip_name: Yup.string()
      .required('Scholarship Name is required')
      .min(3, 'Scholarship Name should be at least 3 characters')
      .max(100, 'Scholarship Name should be at most 100 characters'),

   brief_descrition: Yup.string()
      .required('Brief Description is required')
      .max(300, 'Brief Description should be at most 300 characters'),

   start_Date: Yup.date()
      .required('Start Date is required')
      .typeError('Please enter a valid date'),

   End_Date: Yup.date()
      .required('End Date is required')
      .typeError('Please enter a valid date')
      .min(Yup.ref('start_Date'), 'End Date cannot be before Start Date'),

   SelectionProcess: Yup.string()
      .required('Selection Process is required')
      .max(300, 'Selection Process should be at most 300 characters'),

   type: Yup.string()
      .required('Type is required'),

   language_Of_Study: Yup.string()
      .required('Language of Study is required')
      .min(2, 'Language should be at least 2 characters'),

   Place_of_Study: Yup.string()
      .required('Place of Study is required')
      .max(100, 'Place of Study should be at most 100 characters'),

   expenses_coverd: Yup.number()
      .required('Expenses Covered is required')
      .min(0, 'Expenses Covered cannot be negative')
      .typeError('Please enter a valid number'),

   eligbility_criteria: Yup.string()
      .required('Eligibility Criteria is required')
      .max(500, 'Eligibility Criteria should be at most 500 characters'),

   term_and_conditions: Yup.string()
      .required('Terms and Conditions are required')
      .max(1000, 'Terms and Conditions should be at most 1000 characters'),

   form_Link: Yup.string()
      .required('Form Link is required')
      .url('Enter a valid URL for the Form Link'),

   website_link: Yup.string()
      .required('Website Link is required')
      .url('Enter a valid URL for the Website Link'),

   key_personnel_details: Yup.string()
      .required('Key Personnel Details are required')
      .max(500, 'Key Personnel Details should be at most 500 characters'),

   number_of_seats_available: Yup.number()
      .required('Number of Seats Available is required')
      .min(1, 'There should be at least 1 seat available')
      .typeError('Please enter a valid number'),

   // scholarship_picture: Yup.mixed()
   //    .required('Scholarship Picture is required')
   //    .test(
   //       'fileType',
   //       'Only JPEG, JPG, and PNG files are allowed',
   //       (value) => {
   //          console.log('File:', value);  // Log the entire file object
   //          console.log('File type:', value && value.type); // Log the file type specifically

   //          // Check if the type is one of the allowed types
   //          return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
   //       }
   //    )
});
export const editScholarship = Yup.object({
   scholarsip_name: Yup.string()
      .required('Scholarship Name is required')
      .min(3, 'Scholarship Name should be at least 3 characters')
      .max(100, 'Scholarship Name should be at most 100 characters'),

   brief_descrition: Yup.string()
      .required('Brief Description is required')
      .max(300, 'Brief Description should be at most 300 characters'),

   start_Date: Yup.date()
      .required('Start Date is required')
      .typeError('Please enter a valid date'),

   End_Date: Yup.date()
      .required('End Date is required')
      .typeError('Please enter a valid date')
      .min(Yup.ref('start_Date'), 'End Date cannot be before Start Date'),

   SelectionProcess: Yup.string()
      .required('Selection Process is required')
      .max(300, 'Selection Process should be at most 300 characters'),

   type: Yup.string()
      .required('Type is required'),

   language_Of_Study: Yup.string()
      .required('Language of Study is required')
      .min(2, 'Language should be at least 2 characters'),

   Place_of_Study: Yup.string()
      .required('Place of Study is required')
      .max(100, 'Place of Study should be at most 100 characters'),

   expenses_coverd: Yup.number()
      .required('Expenses Covered is required')
      .min(0, 'Expenses Covered cannot be negative')
      .typeError('Please enter a valid number'),

   eligbility_criteria: Yup.string()
      .required('Eligibility Criteria is required')
      .max(500, 'Eligibility Criteria should be at most 500 characters'),

   term_and_conditions: Yup.string()
      .required('Terms and Conditions are required')
      .max(1000, 'Terms and Conditions should be at most 1000 characters'),

   form_Link: Yup.string()
      .required('Form Link is required')
      .url('Enter a valid URL for the Form Link'),

   website_link: Yup.string()
      .required('Website Link is required')
      .url('Enter a valid URL for the Website Link'),

   key_personnel_details: Yup.string()
      .required('Key Personnel Details are required')
      .max(500, 'Key Personnel Details should be at most 500 characters'),

   number_of_seats_available: Yup.number()
      .required('Number of Seats Available is required')
      .min(1, 'There should be at least 1 seat available')
      .typeError('Please enter a valid number'),

   // scholarship_picture: Yup.mixed()
   //    .required('Scholarship Picture is required')
   //    .test(
   //       'fileType',
   //       'Only JPEG, JPG, and PNG files are allowed',
   //       (value) => {
   //          console.log('File:', value);  // Log the entire file object
   //          console.log('File type:', value && value.type); // Log the file type specifically

   //          // Check if the type is one of the allowed types
   //          return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
   //       }
   //    )
});