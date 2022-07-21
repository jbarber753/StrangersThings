import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {default as Header} from './Header';
import { signUp, logIn } from "../api";

const Login = ({authenticated, setAuthenticated, currentUser, setCurrentUser}) => {
    const [signingUp, setSigningUp] = useState(false);

    useEffect(() => {
        setAuthenticated(false);
    }, [setAuthenticated])

    const handleSignUp = (event) => {
        const newUser = {
            username: document.getElementById('login-form').username.value,
            password: document.getElementById('login-form').password.value
        }
        event.preventDefault();
        signUp(newUser);
        setSigningUp(false);
    }

    const handleLogIn = (event) => {
        const user = {
            username: document.getElementById('login-form').username.value,
            password: document.getElementById('login-form').password.value
        }
        event.preventDefault();
        logIn(user)
        .then((result) => {
            let displayName = user.username;
            setCurrentUser({username: displayName, token: result})
        });
        setAuthenticated(true);
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
                            <span id="registration-type" onClick={(event) => {setSigningUp(false)}}>Already have an account? Sign in</span>
                        </Fragment>:
                            <Fragment>
                                <span id="login-header">Log In</span>
                                <label htmlFor="username">Username</label>
                                <input type='text' placeholder='Enter username...' id="username"></input>
                                <label htmlFor="password">Password</label>
                                <input type='text' placeholder='Enter password...' id="password"></input>
                                <button id="login-submit" onClick={ handleLogIn }>
                                    <Link to='/'>Log In</Link>
                                </button>
                                <span id="registration-type" onClick={(event) => {setSigningUp(true)}}>Create an account</span>
                            </Fragment>
                        }
                    </form>
                </section>
        </Fragment>
    )
}

export default Login;