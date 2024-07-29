import React, { useState } from "react";
import './Signin.css'; // Import your custom CSS file
import { Button } from "react-bootstrap";

const Signin = ({ toggleAuthMode }) => {
    const [userDetails, setUserDetails] = useState({
        Email: '',
        Password: '',
        CP: ''
    });
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    const emailChangeHandler = (event) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            Email: event.target.value
        }));
    };

    const passwordChangeHandler = (event) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            Password: event.target.value
        }));
    };

    const confirmPasswordHandler = (event) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            CP: event.target.value
        }));
    };

    const signUpHandler = async (event) => {
        event.preventDefault();

        if (userDetails.Email.trim().length === 0) {
            setAlert({ show: true, variant: 'danger', message: 'Email is required' });
            return;
        }
        if (userDetails.Password.trim().length <= 4) {
            setAlert({ show: true, variant: 'danger', message: 'Password must be at least 5 characters long' });
            return;
        }
        if (userDetails.Password !== userDetails.CP) {
            setAlert({ show: true, variant: 'danger', message: 'Passwords do not match' });
            return;
        }

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAi10K9kc8mcglBtMD_vjS76L5WTFdDnnM', { // Replace YOUR_API_KEY with your actual API key
                method: "POST",
                body: JSON.stringify({
                    email: userDetails.Email,
                    password: userDetails.Password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error.message || 'Something went wrong');
            }

            console.log(responseData);
            setAlert({ show: true, variant: 'success', message: 'Successfully signed up' });
        } catch (error) {
            setAlert({ show: true, variant: 'danger', message: error.message });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-image">
                <img src="https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_login_man-1024.png" alt="Sign Up" />
            </div>
            <div className="auth-form-container">
                <h3 className="form-heading">Sign Up</h3>
                {alert.show && (
                    <div className={`alert ${alert.variant}`}>
                        {alert.message}
                        <button className="close-alert" onClick={() => setAlert({ show: false })}>x</button>
                    </div>
                )}
                <form onSubmit={signUpHandler} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="Email" className="form-label">E-mail</label>
                        <input
                            type="email"
                            id="Email"
                            placeholder="Enter Your E-Mail Id"
                            onChange={emailChangeHandler}
                            value={userDetails.Email}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Your Password"
                            onChange={passwordChangeHandler}
                            value={userDetails.Password}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Confirm" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="Confirm"
                            placeholder="Re-write The Password Here"
                            onChange={confirmPasswordHandler}
                            value={userDetails.CP}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-footer">
                        <Button type="submit" className="submit-button" variant='primary'>Sign Up</Button>
                        <Button type="button" className="switch-button" onClick={toggleAuthMode} variant='secondary'>Already Have an Account</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
