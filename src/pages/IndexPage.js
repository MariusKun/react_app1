import React from 'react'
import mainContext from '../context/mainContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const IndexPage = () => {

  const {getCurrentUser, getChats, setChats} = useContext(mainContext)
  const navigate = useNavigate()
 
  const temp1 = getChats.filter(x => (x[0] === getCurrentUser.name || x[1] === getCurrentUser.name))
  let temp2 = []

  for (let i = 0; i < temp1.length; i++) {
    if (temp1[i][0] !== getCurrentUser.name) temp2.push(temp1[i][0])
    if (temp1[i][1] !== getCurrentUser.name) temp2.push(temp1[i][1])
  }
  let unique = [...new Set(temp2)]

  function startChat(otherUser) {
    navigate('/chat/'+otherUser)
  }

  function deleteChat(person) {
    const myUser = getCurrentUser.name
    const otherUser = person

    const temp1 = [...getChats]
    let temp2 = []
  
    for (let i = 0; i < temp1.length; i++) {
      let result = true
      if (temp1[i][0] === myUser && temp1[i][1] === otherUser) result = false
      if (temp1[i][1] === myUser && temp1[i][0] === otherUser) result = false
      if (result) temp2.push(temp1[i])
    }

    setChats(temp2)
  }

  return (
    <div className='chatWith'>
      {getChats && unique && unique.map((x, i) =>
      <div className='chatEntry' style={{border: '1px solid pink'}} key={i} >
        <div className='chats' onClick={() => startChat(unique[i])}>Chat with user: {unique[i]}</div>
        <div><button onClick={() => deleteChat(unique[i])}>Delete</button></div>        
      </div>
      )}
    </div>
  )
}

export default IndexPage