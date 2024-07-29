import React, { useState } from "react";
import Signin from "./Signin";
import Login from "./Login";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
    };

    return (
        <div>
            {isSignUp ? (
                <Signin toggleAuthMode={toggleAuthMode} />
            ) : (
                <Login toggleAuthMode={toggleAuthMode} />
            )}
        </div>
    );
};

export default Auth;
