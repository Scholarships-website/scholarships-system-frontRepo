import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registrationScheme } from '../../../Validation/validation';
import Input from '../Input/Input';
import PhoneInput from '../Input/PhoneInput'; // Import PhoneInput
import axios from 'axios';
import './SignUp.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const initialValues = {
        user_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phoneNumber: '',  // Full phone number including country code
        countryCode: '+970', // Default country code
    };

    const navigate = useNavigate();
    const [student, setStudent] = useState({});

    const onSubmit = async (studentData) => {
        const { confirmPassword, ...dataToSend } = studentData;

        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/students/register', dataToSend);
            if (data.message === 'Signup successful!') {
                setStudent(data.data);
                toast.success('Sign up successfully!!', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate('/PalScolarships');
                }, 3000);
            }
        } catch (error) {
            if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
                error.response.data.errors.forEach(err => {
                    toast.error(err, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                });
            } else {
                toast.error("An unexpected error occurred", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registrationScheme,
    });

    const inputs = [
        {
            type: 'text',
            id: 'user_name',
            name: 'user_name',
            title: 'username',
            value: formik.values.user_name,
        },
        {
            type: 'email',
            id: 'email',
            name: 'email',
            title: 'Email Address',
            value: formik.values.email,
        },
        {
            type: 'password',
            id: 'password',
            name: 'password',
            title: 'Password',
            value: formik.values.password,
        },
        {
            type: 'password',
            id: 'confirmPassword',
            name: 'confirmPassword',
            title: 'Confirm Password',
            value: formik.values.confirmPassword,
        },
        {
            type: 'text',
            id: 'first_name',
            name: 'first_name',
            title: 'First Name',
            value: formik.values.first_name,
        },
        {
            type: 'text',
            id: 'last_name',
            name: 'last_name',
            title: 'Last Name',
            value: formik.values.last_name,
        },
    ];

    const renderInputs = inputs.map((input, index) => (
        <Input
            type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            key={index}
            errors={formik.errors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            value={formik.values[input.name]}
            colSize="col-md-12"
        />
    ));

    // Define handleLoginNavigation function
    const handleLoginNavigation = () => {
        navigate('/login'); // Adjust the path as needed
    };

    return (
        <div className='signup'>
            <div className="logoContainer">
                <img src="src/assets/img/logo.png" alt="logo" width="100px" />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <section className="registrationContainer">
                <div className="animationContainer">
                    <iframe src="https://lottie.host/embed/6bd501ce-91ab-47aa-bad8-a61ec42174e8/zwZupXfoO0.json" width='500px' height='500px'></iframe>
                </div>
                <div className="formContainer" style={{ borderRadius: 25 }}>
                    <div className="card-body">
                        <p className='signupP'>Create your account</p>
                        <form className="registrationForm" id="registrationForm" onSubmit={formik.handleSubmit}>
                            {renderInputs}
                            <div className="col-md-12">
                                <PhoneInput
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    errors={formik.errors}
                                    touched={formik.touched}
                                    countryCode={formik.values.countryCode} // Pass the country code to the PhoneInput
                                />
                            </div>
                            <p className="alreadyAccountText" style={{ marginTop: '15px', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleLoginNavigation}>
                                Already have an account?
                            </p>
                            <div className="btnContainer">
                                <button type="submit" className="registerBtn btn btn-lg">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
