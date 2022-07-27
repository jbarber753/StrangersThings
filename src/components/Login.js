import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {default as Header} from './Header';
import { signUp, logIn } from "../api";

const Login = ({authenticated, setAuthenticated, currentUser, setCurrentUser }) => {
    const [signingUp, setSigningUp] = useState(false);
    const [gotError, setGotError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAuthenticated(false);
    }, [setAuthenticated])

    const handleSignUp = async (event) => {
        const newUser = {
            username: document.getElementById('login-form').username.value,
            password: document.getElementById('login-form').password.value
        }
        setGotError(false);
        event.preventDefault();
        try {
            if (newUser.password !== document.getElementById('confirm-password').value){
                throw new Error("Password and confirm password must match");
            };
            await signUp(newUser)
            .then((result) => {
                console.log(result)
                if (result.success === false){
                    throw new Error(result.error.message);
                }
                const displayName = newUser.username;
                setCurrentUser({username: displayName, token: result});
            });
            setAuthenticated(true);
            navigate('/', {state: authenticated, currentUser});
        } catch (error) {
            console.error(error)
            setGotError(error);
        }
    }

    const handleLogIn = async (event) => {
        const user = {
            username: document.getElementById('login-form').username.value,
            password: document.getElementById('login-form').password.value
        }
        setGotError(false);
        event.preventDefault();
        try {
            await logIn(user)
            .then((result) => {
                const displayName = user.username;
                setCurrentUser({username: displayName, token: result});
            });
            setAuthenticated(true);
            navigate('/', {state: authenticated, currentUser});
        } catch (error) {
            const invalidCredentials = new Error("Invalid credentials, please try again");
            console.error(invalidCredentials)
            setGotError(invalidCredentials);
        }
    }

    const handleVisibility = event => {
        setPasswordVisible(!passwordVisible);
    }

    return(
        <Fragment>
            <Header authenticated={authenticated}/>
                <section id="login">
                    <form id="login-form">
                        {signingUp?
                        <Fragment>
                            <span id="login-header">Sign Up</span>
                            <label htmlFor="username">Username</label>
                            <input type='text' placeholder='Enter new username...' id="username"></input>
                            <label htmlFor="password">Password</label>
                            <input type='text' placeholder='Enter new password...' id="password"></input>
                            <input type='text' placeholder='Confirm password...' id="confirm-password"></input>
                            <button id="signup-submit" onClick={ handleSignUp }>Sign Up</button>
                            <span id="registration-type" onClick={(event) => {setSigningUp(false); setGotError(false)}}>Already have an account? Sign in</span>
                        </Fragment>:
                            <Fragment>
                                <span id="login-header">Log In</span>
                                <label htmlFor="username">Username</label>
                                <input type='text' placeholder='Enter username...' id="username"></input>
                                <label htmlFor="password">Password</label>
                                <div id="password-wrapper">
                                    <input type= {passwordVisible? 'text':'password'} placeholder='Enter password...' id="password"></input>
                                    <span className="material-symbols-outlined" id="visibility" onClick={ handleVisibility }>{passwordVisible? 'visibility':'visibility_off'}</span>
                                </div>
                                <button id="login-submit" onClick={ handleLogIn }>Log In</button>
                                <span id="registration-type" onClick={(event) => {setSigningUp(true); setGotError(false)}}>Create an account</span>
                            </Fragment>
                        }
                    </form>
                    {gotError?
                        <div id="login-error">
                            <span className="material-symbols-outlined" id="error-icon">error</span>
                            <span>{gotError.message}</span>
                        </div>:
                        null
                    }
                </section>
        </Fragment>
    )
}

export default Login;