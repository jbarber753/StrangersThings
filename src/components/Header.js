import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = ({authenticated}) => {
    return (
        <header>
            <span id='logo'>Stranger's Things</span>
            <nav>
                {authenticated?
                <Fragment>
                    <Link to='/'>Home</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/login'>Log Out</Link>
                </Fragment>:
                <Fragment>
                    <Link to= '/'>Home</Link>
                    <Link to='/login'>Log in</Link>
                </Fragment>
                }
            </nav>
        </header>
    )
}

export default Header;