import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { 
    Main,
    Posts,
    Login,
    Signup
 } from './components';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: null, token: null});
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={
                    <Main 
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}/>}></Route>
                <Route path='/posts' element={
                    <Posts 
                        authenticated={authenticated}/>}></Route>
                <Route path='/login' element={
                    <Login 
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
