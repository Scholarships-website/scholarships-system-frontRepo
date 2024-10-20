import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import { useFormik } from 'formik';
import { loginScheme } from '../../../Validation/validation';
import Input from '../Input/Input';
import './Login.css';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const initialValues = {
        email: '',
        password: '',
    };
    const navigate = useNavigate();
    // let { userToken, setUserToken, userId, setUserId, userData, setUserData } = useContext(UserContext);
    let { userToken, setUserToken} = useContext(UserContext);

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

    const onSubmit = async (users) => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/v1/login', users); 
            if (data.message === 'login successful!') {
                const role = data.user.role;
                setUser(data.data);
                localStorage.setItem('userToken', data.token);
                setUserToken(data.token);
                // Show success toast notification
                toast.success('Logged in successfully!', {
                    position: "bottom-right",
                    autoClose: false,  
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
    
                // Delay navigation to allow toast to be seen
                setTimeout(() => {
                    switch (role) {
                        case 'admin':
                            navigate('/adminDashboard');
                            break;
                        case 'advertiser':
                            navigate('/AdvertiserDashboard');
                            break;
                        case 'student':
                            navigate('/');
                            break;
                        default:
                            alert('Unknown user role');
                    }
                }, 2000); // Adjust this timeout to allow enough time to see the toast
            } else {
                toast.error('Login failed: ' + data.message, {
                    position: "bottom-right",
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
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response.data.message, {
                position: "bottom-right",
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
    };


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
            <div className="logoContainer">
                <a href="/"><img src="src/assets/img/logo.png" alt="logo" width="100px" /></a>
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