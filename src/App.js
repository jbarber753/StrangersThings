import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { 
    Main,
    Login,
    Profile,
 } from './components';
 
const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: null, token: null});
    const [postList, setPostList] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={
                    <Main 
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        postList={postList}
                        setPostList={setPostList}/>}></Route>
                <Route path='/login' element={
                    <Login 
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}/>}></Route>
                <Route path='/profile' element={
                    <Profile
                        authenticated={authenticated}
                        currentUser={currentUser}
                        postList={postList}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
