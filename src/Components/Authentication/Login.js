import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Authaction } from "../../Store/auth";
import './Login.css';
import { Button } from 'react-bootstrap';

const Login = ({ toggleAuthMode }) => {
    const [userDetails, setUserDetails] = useState({
        Email: '',
        Password: ''
    });
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
    const dispatch = useDispatch();

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

    const logInHandler = async (event) => {
        event.preventDefault();
        if (userDetails.Email.trim().length > 0 && userDetails.Password.trim().length > 4) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAi10K9kc8mcglBtMD_vjS76L5WTFdDnnM', {
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
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                dispatch(Authaction.Login({ idToken: data.idToken }));
                setAlert({ show: true, variant: 'success', message: 'Successfully logged in' });
            } catch (error) {
                setAlert({ show: true, variant: 'danger', message: error.message });
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-image">
                <img src="https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_login_man-1024.png" alt="Log In" />
            </div>
            <div className="auth-form-container">
                <h3 className="form-heading">Log In</h3>
                {alert.show && (
                    <div className={`alert ${alert.variant}`}>
                        {alert.message}
                        <button className="close-alert" onClick={() => setAlert({ show: false })}>x</button>
                    </div>
                )}
                <form onSubmit={logInHandler}>
                    <div className="form-group">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="Email"
                            placeholder="Enter Your Email Id"
                            onChange={emailChangeHandler}
                            value={userDetails.Email}
                            autoComplete="off"
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
                    <div className="form-footer">
                        <Button type="submit" className="submit-button" variant="primary">Log In</Button>
                        <Button type="button" className="link-button" variant='link'>Forgot Password</Button>
                        <Button type="button" className="switch-button" onClick={toggleAuthMode} variant='secondary'>Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
