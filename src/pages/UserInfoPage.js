import React, {useRef} from 'react'
import {useParams} from 'react-router-dom'
import mainContext from '../context/mainContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const UserInfoPage = () => {
  
  const {username} = useParams()
  const inputRef = useRef()
  const {getUsers, setUsers, getCurrentUser, getChats, setChats} = useContext(mainContext)
  const navigate = useNavigate()

  const selectedUser = getUsers.filter(x => x.name === username)
  const selectedUserIndex = getUsers.findIndex(x => x.name === username)

  function deleteUser() {
    const updatedUsers = [...getUsers]
    updatedUsers.splice(selectedUserIndex, 1)
    setUsers(updatedUsers)
    navigate('/users')
  }

  function postMessage() {
    const newMessage = inputRef.current.value
    const item = [getCurrentUser.name, username, newMessage, new Date().toLocaleString()]

    const updateChats = [...getChats]
    updateChats.push(item)
    setChats(updateChats)
  }

  return (
    
    <div className='card'>
      <h1>{selectedUser[0].name}</h1>
      <div><img src={selectedUser[0].image} alt="" /></div>
      <div>{selectedUser[0].admin === true ? 'Role: Admin' : 'Role: Regular user'}</div>
      {getCurrentUser.admin === true && <div><button onClick={deleteUser}>Delete user</button></div>}      
      <div>Send message to {selectedUser[0].name}</div>
      <div><textarea ref={inputRef} cols="50" rows="5" defaultValue='Your message...'></textarea></div>
      <div><button onClick={postMessage}>Send message</button></div>
    </div>
    
  )
}

export default UserInfoPage