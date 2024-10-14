import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../../Context/UserContext';
import { useFormik } from 'formik';
import { loginScheme } from '../../../Validation/validation';
import Input from '../Input/Input';
import './Login.css';
import axios from 'axios';

export default function Login() {
    const initialValues = {
        email: '',
        password: '',
    };
    const navigate = useNavigate();
    // let { userToken, setUserToken, userId, setUserId, userData, setUserData } = useContext(UserContext);

    const [user, setUser] = useState({});
    // useEffect(() => {
    //     if (userToken) {
    //         if (userData.userType == 0) {
    //             navigate('/adminDashboard')
    //         }
    //         else if (userData.userType == 1) {
    //             navigate('/AdvertiserDashboard')
    //         }
    //         else if (userData.userType == 2) {
    //             navigate('/PalScolarships')
    //         }
    //     }
    // }, [userToken, userData, navigate])
    const onSubmit = async users => {
        const { data } = await axios.post('https://localhost:5000/api/v1/students/login', users);
        if (data.succeeded) {
            // setUser(data.data)
            // localStorage.setItem('userToken', data.data.token);
            // setUserToken(data.data.token);
            // if (data.data.userType == 0) {
            //     navigate('/adminDashboard')
            // }
            // else if (data.data.userType == 1) {
            //     navigate('/AdvertiserDashboard')
            // }
            // else if (data.data.userType == 2) {
                navigate('/PalScolarships')
            // }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit,
        validationSchema: loginScheme
    })
    const inputs = [
        {
            type: 'email',
            id: 'email',
            name: 'email',
            title: 'User Email',
            value: formik.values.email,
        },
        {
            type: 'password',
            id: 'password',
            name: 'password',
            title: 'User Password',
            value: formik.values.password,
        },
    ]
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
    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Navigate to the forgot password page
    };
    return (
        <>
            <div className="logoContainer">
                <img src="src/assets/img/logo.png" alt="logo" width="100px" />
            </div>
            <section className="loginContainer" style={{ backgroundColor: '#fff' }} >
                <div className="animationContainer">
                    <iframe src="https://lottie.host/embed/b60b1f1f-181c-4ace-9378-52ccead1d285/9IAC16aUWY.json" width="500px" height="500px" />
                </div>
                <div className="formContainer style={{ borderRadius: 25 }}">
                    <div className="card-body">
                        <p className='signinP'>Sign in</p>
                        <form className="registrationForm" id="registrationForm" onSubmit={formik.handleSubmit}>
                            {renderInputs}
                            <div className="forgot-password mt-3">
                                <a href="#" onClick={handleForgotPassword} className="text-muted">Forgot Password?</a>
                            </div>
                            <div className="btnContainer">
                                <button type="submit" className="loginBtn btn  btn-lg">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section ></>
    )
}