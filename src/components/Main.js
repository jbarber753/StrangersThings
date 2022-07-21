import React, { Fragment } from 'react';

import { default as Header } from './Header';

const Main = ({authenticated, setAuthenticated, currentUser }) => {

    return (
        <Fragment>
                <Header
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}/>
                <main>
                    <section id="posts">
                        <form>
                            <input type="search" placeholder="Search for posts..."/>
                            <button className="material-symbols-outlined">search</button>
                        </form>
                        <div>
                            {authenticated?
                                <Fragment>
                                    <span>Welcome, {currentUser.username}!</span>
                                    <button>Create New Post</button>
                                </Fragment>:
                                <Fragment>
                                    <span>Welcome, guest!</span>
                                </Fragment>
                            }
                        </div>
                        <iframe title='view' src='/posts' id='postview'></iframe>
                    </section>
                    <section id="view">
                        {authenticated?
                        <Fragment><span>Click "Create New Post" to open a new draft,</span>
                        <span>or click "Send Message" to contact other users</span></Fragment>:
                        <Fragment><span>Log in to create new posts</span>
                        <span>or send messages</span></Fragment>
                        }
                    </section>
                </main>
        </Fragment>
    );
 }

 export default Main;