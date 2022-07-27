import React, { Fragment, useState, useEffect } from 'react';

import { default as Header } from './Header';
import { createPost, getPosts, deletePost, createMessage } from '../api';

const Main = ({authenticated, setAuthenticated, currentUser, postList, setPostList }) => {
    const [viewScreen, setViewScreen] = useState('');
    const [checked, setChecked] = useState(false);
    const [messageTarget, setMessageTarget] = useState('');

    useEffect(() => {
        getPosts(currentUser)
        .then((result) => {setPostList(result)});
    }, [currentUser, setPostList])

    const handleView = (event) => {
        setViewScreen(event.target.id);
        if (event.target.id === 'newmessage'){
            setMessageTarget(event.target.parentNode.parentNode.id);
        }
    }

    const handleCheckbox = (event) => {
        setChecked(!checked);
    }

    const handleClose = (event) => {
        setViewScreen('');
    }

    const handleCreatePost = (event) => {
        event.preventDefault();
        const form = document.getElementById('new-post-form');
        const post =
            {
                token: currentUser.token,
                title: form.elements.newtitle.value,
                author: currentUser.username,
                price: form.elements.newprice.value,
                location: form.elements.newlocation.value,
                willDeliver: checked,
                description: form.elements.newdescription.value
            };
            createPost(post);
            setViewScreen('');
            getPosts(currentUser)
            .then((result) => {setPostList(result)});
    }

    const checkView = (viewScreen) => {
        
        switch (viewScreen){
            case '':
                return (
                    <section id='empty-view'>
                        <span>Click "Create New Post" to open a new draft,</span>
                        <span>or click "Send Message" to contact other users</span>
                    </section>
                );
            case 'newpost':
                return (
                    <div id='new-post-view'>
                        <button id='new-post-close' onClick={ handleClose }>X</button>
                        <span>Create New Post</span>
                        <form id='new-post-form'>
                            <div>
                                <label htmlFor='new-title'>Title</label>
                                <input name='newtitle' type='text'/>
                            </div>
                            <div>
                                <label htmlFor='new-price'>Asking price</label>
                                <input name='newprice' type='text'/>
                            </div>
                            <div>
                                <label htmlFor='new-location'>Location</label>
                                <input name='newlocation' type='text'/>
                            </div>
                            <div>
                                <label htmlFor='new-will-deliver'>Will deliver</label>
                                <input id='new-will-deliver' name='newwilldeliver' type='checkbox' onClick= { handleCheckbox }/>
                            </div>
                            <div>
                                <label htmlFor='new-description'>Description</label>
                                <input name='newdescription' type='text'/>
                            </div>
                            <button id='new-post-submit' onClick={ handleCreatePost }>Post</button>
                        </form>
                    </div>
                );
            case 'newmessage':
                return (
                    <div id='new-message-view'>
                        <button id='new-post-close' onClick={ handleClose }>X</button>
                        <span>New Message</span>
                        <input name='newMessage' type='text' id='new-message-form'></input>
                        <button id='new-message-submit' onClick={ handleCreateMessage }>Send</button>
                    </div>
                );
            default:
        }
    }

    const checkIsUser = (post) => {
        if (post.isAuthor === true){
            return <button className='delete' onClick={ handleDelete }>Delete Post</button>
        }
        else {
            return <button className='message-button' id='newmessage' onClick={ handleView }>Send Message</button>
        }
    }

    const handleDelete = (event) => {
        event.preventDefault();
        const thisPost = event.target.parentNode.parentNode.id;
        deletePost(thisPost, currentUser);
        setPostList(postList.filter((post) => {return post._id !== thisPost}))
    }

    const handleCreateMessage = (event) => {
        event.preventDefault();
        const message =
            {
                post: messageTarget,
                author: currentUser.token,
                content: document.getElementById('new-message-form').value
            }
        createMessage(message);
        setViewScreen('');
    }

    const handleSearch = event => {
        event.preventDefault();
        let input = document.getElementById('search-bar').value.toLowerCase();
        let checkPosts = document.getElementsByClassName('post')
        for (let i = 0; i < postList.length; i++){
            if (!postList[i].title.toLowerCase().includes(input) && !postList[i].author.username.toLowerCase().includes(input)){
                checkPosts[i].style.display = 'none';
            }
            else {
                checkPosts[i].style.display = 'block';
            }
        }
    }
    
    return (
        <Fragment>
                <Header
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}/>
                <main>
                    <section id="posts">
                        <form id='search'>
                            <input type="search"  id='search-bar' placeholder="Search for posts..."/>
                            <button className="material-symbols-outlined" id='search-button' onClick={ handleSearch }>search</button>
                        </form>
                        <div id='postgreeting'>
                            {authenticated?
                                <Fragment>
                                    <span>Welcome, {currentUser.username}!</span>
                                    <button id="newpost" onClick={ handleView }>Create New Post</button>
                                </Fragment>:
                                <Fragment>
                                    <span>Welcome, guest!</span>
                                </Fragment>
                            }
                        </div>
                        <div id='postview'>
                            {postList.map(post => (
                                <div className='post' key={post._id} id={post._id}>
                                    <div className='post-header'>
                                        <span className="title">{post.title}</span>
                                        <span className="author">from {post.author.username}</span>
                                    </div>
                                    <div className='post-main'>
                                        <ul className="details">
                                            <li>Asking price: {post.price}</li>
                                            <li>Location: {post.location}</li>
                                            {post.willDeliver? <li>Will deliver</li> : <li>Will not deliver</li>}
                                        </ul>
                                        <span className="description">{post.description}</span>
                                        {authenticated?
                                            checkIsUser(post):
                                            null
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    {authenticated?
                            checkView(viewScreen):
                            <section id='empty-view'>
                                <span>Log in to create new posts</span>
                                <span>or send messages</span>
                            </section>
                    }
                </main>
        </Fragment>
    );
 }

 export default Main;