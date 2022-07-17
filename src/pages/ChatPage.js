import React from 'react'
import {useParams} from 'react-router-dom'
import mainContext from '../context/mainContext'
import { useContext } from 'react'
import Message from '../components/Message'
import SendMessage from '../components/SendMessage'

const ChatPage = () => {
  const {username} = useParams()
  const {getUsers, setUsers, getCurrentUser, setCurrentUser, getChats} = useContext(mainContext)
  
  const selectedChat = getChats.filter(x => (x[0] === getCurrentUser.name && x[1] === username) || (x[1] === getCurrentUser.name && x[0] === username))

  const selectedUser = getUsers.filter(x => x.name === username)

  function toggleBan() {
    if (getCurrentUser.bans.includes(username)) {
      const updatedCurrentUser = {...getCurrentUser}
      updatedCurrentUser.bans = updatedCurrentUser.bans.filter(x => x !== username)
      setCurrentUser(updatedCurrentUser)

      const userIndex = getUsers.findIndex(x => x.name === getCurrentUser.name)
      const updatedUsers = [...getUsers]
      updatedUsers[userIndex].bans = updatedUsers[userIndex].bans.filter(x => x !== username)
      setUsers(updatedUsers)
    } else {
      const updatedCurrentUser = {...getCurrentUser}
      updatedCurrentUser.bans.push(username)
      setCurrentUser(updatedCurrentUser)
      
      const userIndex = getUsers.findIndex(x => x.name === getCurrentUser.name)
      const updatedUsers = [...getUsers]
      updatedUsers[userIndex].bans.push(username)
      setUsers(updatedUsers)
    }
  }

  return (
    <div className='chatBox'>
      {selectedChat && <h1>Conversation with {username}</h1>}      
      {selectedChat && selectedUser.length ?
      <button onClick={toggleBan}>{getCurrentUser.bans.includes(username) ? `Unblock ${username}` : `Block ${username}`}</button>
      : 'User deleted!'
      }
      {/* {selectedChat && selectedUser.length && <button onClick={toggleBan}>{getCurrentUser.bans.includes(username) ? `Unblock ${username}` : `Block ${username}`}</button>} */}
      {selectedChat && selectedChat.map((x,i) => <Message key={i} message={x}/>)}
      {selectedChat && <SendMessage username={username}/>}
    </div>
  )
}

export default ChatPage