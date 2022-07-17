import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mainContext from '../context/mainContext'
import { useContext } from 'react'

const Navigation = () => {
  
  const {getCurrentUser, setCurrentUser, getChats} = useContext(mainContext)
  const [getNumber, setNumber] = useState(0)

  const nav = useNavigate()

  function logOut() {
    setCurrentUser(null)
    setNumber(0)
    nav('/login')    
  }

  useEffect(() => {
    if (getCurrentUser) {
      const myUser = getCurrentUser.name

      const temp = [...getChats]

      const temp1 = temp.filter(x => (x[0] === myUser || x[1] === myUser))
      let temp2 = []
    
      for (let i = 0; i < temp1.length; i++) {
        if (temp1[i][0] !== myUser) temp2.push(temp1[i][0])
        if (temp1[i][1] !== myUser) temp2.push(temp1[i][1])
      }
      let unique = [...new Set(temp2)]

      setNumber(unique.length)
    } else {
      setNumber(0)
    }
  }, [getChats, getCurrentUser])
  

  return (
    <div>
      {getCurrentUser &&
      <div className='navigation'>
        <Link to={'/'}>Conversations ({getNumber})</Link>
        <Link to={'/users'}>All Users</Link>
        <Link to={'/userprofile'}>My profile</Link>
        <span onClick={logOut} style={{cursor: 'pointer', color: 'red', fontWeight: '600'}}>Logout</span>
      </div>}
      {!getCurrentUser &&
      <div className='navigation'>
        <Link to={'/register'}>Register</Link>
        <Link to={'/login'}>Login</Link>
      </div>}
    </div>
  )
}

export default Navigation