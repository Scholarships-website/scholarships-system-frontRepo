import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registrationScheme } from '../../../Validation/validation'; // Add validation schema for registration
import Input from '../Input/Input';
import axios from 'axios';
import './SignUp.css';


export default function SignUp() {
    const initialValues = {
        user_name: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phoneNumber: '',
        // confirmPassword: '',
        // studentId: '',   // New field for student-specific information
    };

    const navigate = useNavigate();
    const [student, setStudent] = useState({});

    const onSubmit = async (studentData) => {

        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/students/register', studentData);
            if (data.succeeded) {
                setStudent(data.data);
                navigate('/PalScolarships');
            } else {
                // Handle the case where registration failed
                console.error(data.message);
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registrationScheme, // Custom validation schema for registration
    });

    const inputs = [
        {
            type: 'text',
            id: 'user_name',
            name: 'user_name',
            title: 'Username',
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
        // {
        //     type: 'password',
        //     id: 'confirmPassword',
        //     name: 'confirmPassword',
        //     title: 'Confirm Password',
        //     value: formik.values.confirmPassword,
        // },
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
        {
            type: 'number',
            id: 'phoneNumber',
            name: 'phoneNumber',
            title: 'Phone Number',
            value: formik.values.phoneNumber,
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
    const handleLoginNavigation = () => {
        navigate('/PalScolarships');
    };
    return (
        <div className='signup'>
            <div className="logoContainer">
                <img src="src/assets/img/logo.png" alt="logo" width="100px" />
            </div>
            <section className="registrationContainer" style={{ backgroundColor: '#fff' }}>
                <div className="animationContainer">
                    <iframe src="https://lottie.host/embed/6bd501ce-91ab-47aa-bad8-a61ec42174e8/zwZupXfoO0.json" width='500px' height='500px'></iframe>                </div>
                <div className="formContainer" style={{ borderRadius: 25 }}>
                    <div className="card-body">
                        <p className='signupP'>Create your account </p>
                        <form className="registrationForm" id="registrationForm" onSubmit={formik.handleSubmit}>
                            {renderInputs}
                            <p className="alreadyAccountText" style={{ marginTop: '15px', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer', }} onClick={handleLoginNavigation}>
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
