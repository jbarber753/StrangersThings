import React, { Fragment } from 'react';

import { default as Header } from './Header';
import { default as Posts } from './Posts';

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
                            <button className="material-symbols-outlined" id='search-button'>search</button>
                        </form>
                        <div id='postgreeting'>
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
                        {/* <iframe title='view' src='/posts' id='postview'></iframe> */}
                        <div id='postview'>
                            <Posts
                                authenticated={authenticated}/>
                        </div>
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