import React, { useState, useRef } from 'react'
import mainContext from '../context/mainContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const {getUsers} = useContext(mainContext)
  const {setCurrentUser} = useContext(mainContext)

  const [error, setError] = useState(null)
  const usernameRef = useRef()
  const passOneRef = useRef()

  const nav = useNavigate()

  function loginUser() {
    let invalid = false

    const user = {
      name: usernameRef.current.value,
      pass: passOneRef.current.value,
    }

    const userIsInDatabase = getUsers.find(x => x.name === user.name)
    
    if (!userIsInDatabase) {
      invalid = 'No such user in our database!'
    } else if (userIsInDatabase && userIsInDatabase.pass !== user.pass) {
      invalid = 'Bad password provided!'
    }
    if(invalid) return setError(invalid)

    setError(null)
    setCurrentUser(userIsInDatabase)
    nav('/userprofile')
  }

  return (
    <div className='start'>
      <h1>User login</h1>
      <div className='r'>Username: <input ref={usernameRef} type="text" defaultValue='Marius'/></div>
      <div className='r'>Password: <input ref={passOneRef} type="text" defaultValue='gaU@#$%^'/></div>
      <div><button onClick={loginUser}>Log in</button></div>
      {error && <div>{error}</div>}
    </div>
  )
}

export default LoginPage