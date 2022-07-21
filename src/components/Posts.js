import React, { useEffect, useState } from 'react';
import { getPosts } from '../api';

const Posts = ({authenticated}) => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        getPosts()
        .then((result) => {setPostList(result)});
    }, [])

    return postList.map(post => (
            <div className='post' key={post._id}>
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
                        <button className='message'>Send Message</button>:
                        null
                    }
                </div>
            </div>
    ))
}

export default Posts;