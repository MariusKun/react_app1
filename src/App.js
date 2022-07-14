import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Toolbar from "./components/Toolbar";


function App() {

    return (

        <div className="App">
            <BrowserRouter>
                <Toolbar/>

                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>


                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;