import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import News from "./containers/News";
import OneArticle from "./containers/OneArticle";
import PostForm from "./containers/PostForm";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<News/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/news/:id' element={<OneArticle/>}/>
                <Route path='/add-newPost' element={<PostForm/>}/>
            </Route>
            <Route path='*' element={(
                <h1>Not found!</h1>
            )}/>
        </Routes>
    );
}

export default App;
