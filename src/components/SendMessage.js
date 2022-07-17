import React, {useRef, useState} from 'react'
import mainContext from '../context/mainContext'
import { useContext } from 'react'

const SendMessage = ({username}) => {

  const inputRef = useRef()
  const {getUsers, getCurrentUser, getChats, setChats} = useContext(mainContext)
  const [error, setError] = useState(null)

  const selectedUser = getUsers.filter(x => x.name === username)

  function reply() {
    if (selectedUser.length) {
      if (selectedUser[0].bans.includes(getCurrentUser.name)) {
        setError(`You are banned by ${selectedUser[0].name}!`)
        return
      } else if (getCurrentUser.bans.includes(username)) {
        setError(`You blocked ${username}, you can't send messages!`)
        return      
      }
  
      const newMessage = inputRef.current.value
      const item = [getCurrentUser.name, username, newMessage, new Date().toLocaleString()]
      const updateChats = [...getChats]
      updateChats.push(item)
      setChats(updateChats)
  
      setError(null)
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {selectedUser.length ?
      <div>
        <div>
          <textarea ref={inputRef} cols="60" rows="5" defaultValue='Your message...'></textarea>
        </div>
        <div>
          <button onClick={reply}>Reply</button>
        </div>
      </div>
      :''}
    </div>
  )
}

export default SendMessage