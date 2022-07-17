import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import mainContext from './context/mainContext'
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AllUsersPage from './pages/AllUsersPage';
import UserInfoPage from './pages/UserInfoPage';
import ChatPage from './pages/ChatPage';

function App() {

  const [getUsers, setUsers] = useState([

    {
      name: 'Nevardas',
      pass: 'kjcyfdg%U2-i',
      admin: true,
      image: 'https://iconarchive.com/download/i2335/aha-soft/people/user.ico',
      bans: []
    },

    {

      name: 'Niekada',
      pass: 'tcossvc%U2-i',
      admin: false,
      image: 'https://findicons.com/files/icons/573/must_have/256/user.png',
      bans: []
    },    
    {

      name: 'Visada',
      pass: 'tcosbd%U2-i',
      admin: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/2048px-Crystal_Clear_kdm_user_female.svg.png',
      bans: []
    },    

  ])
  const [getCurrentUser, setCurrentUser] = useState(null)
  const [getChats, setChats] = useState([])

  

  return (
    <div className="App">
      <mainContext.Provider value={{getUsers, setUsers, getCurrentUser, setCurrentUser, getChats, setChats}}>
        <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path='/' element={<IndexPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/userprofile' element={<UserProfilePage />}/>
            <Route path='/users' element={<AllUsersPage />}/>
            <Route path='/user/:username' element={<UserInfoPage />}/>
            <Route path='/chat/:username' element={<ChatPage />}/>
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </div>
  );
}

export default App;
