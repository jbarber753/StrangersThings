import React, { Fragment, useEffect, useState } from "react";

import { default as Header } from './Header';

import { getMyInfo } from "../api";

const Profile = ({authenticated, currentUser, postList }) => {
    const [myInfo, setMyInfo] = useState({posts: [], messages: []});
    useEffect(() => {
        getMyInfo(currentUser)
        .then((result) => {setMyInfo(result)})
    }, [currentUser])

    const filterPosts = (post) => {
        if (post.active === true){
            return (
                <div className='post' key={post._id} id={post._id}>
                    <div className='post-header'>
                        <span className="title">{post.title}</span>
                    </div>
                    <div className='post-main'>
                        <ul className="details">
                            <li>Asking price: {post.price}</li>
                            <li>Location: {post.location}</li>
                            {post.willDeliver? <li>Will deliver</li> : <li>Will not deliver</li>}
                        </ul>
                        <span className="description">{post.description}</span>
                    </div>
                </div>
            )
        }
    }

    const filterMessages = (message) => {
        const messageLocation = message.post._id;
        const test = (e) => e._id === messageLocation && e.active === true;
        if (postList.some(test) === true){
            return (
                <div className="message" key={message._id}>
                    <div className="message-header">
                        <ul>
                            <li>From: {message.fromUser.username}</li>
                            <li>Post: {message.post.title}</li>
                        </ul>
                    </div>
                    <div className='message-main'>
                        <span>{message.content}</span>
                    </div>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <Header authenticated={authenticated}/>
            {authenticated?
                <div id="profile-view">
                    <div id="profile-posts">
                        {myInfo.posts.map(post => (
                            filterPosts(post)
                        ))}
                    </div>
                    <div id="profile-messages">
                        {myInfo.messages.map(message => (
                            filterMessages(message)
                        ))}
                    </div>
                </div>:
                <div id="profile-error">
                    <div>
                        <span className="material-symbols-outlined" id="error-icon">error</span>
                        <span>Error: page not found</span>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Profile;