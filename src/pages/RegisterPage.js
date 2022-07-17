import React, { useState, useRef } from 'react'
import mainContext from '../context/mainContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const {getUsers, setUsers} = useContext(mainContext)

  const [error, setError] = useState(null)
  const usernameRef = useRef()
  const passOneRef = useRef()
  const passTwoRef = useRef()
  const roleRef = useRef()

  const nav = useNavigate()

  function validateName(text) {
    return text.length > 3 && text.length < 21
  }

  function validatePass(text) {
    let result = false
    const reg = /^(?=.*[!@#$%^&*_+])(?=.*[a-z])(?=.*[A-Z]).{4,}$/
    if (text.length < 4 || text.length > 21) result = true
    if (!reg.test(text)) result = true
    return result
  }

  function registerUser() {
    let invalid = false

    const user = {
      name: usernameRef.current.value,
      pass: passOneRef.current.value,
      admin: roleRef.current.checked,
      image: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360',
      bans: []
    }

    if (!validateName(user.name)) {
      invalid = 'Username lenght should be 4-20 chars!'
    } else if (validatePass(user.pass)) {
      invalid = 'Bad password! 4-20 chars and must contain special symbols (!@#$%^&*_+) + uppercase letter!'
    } else if (user.pass !== passTwoRef.current.value) {
      invalid = 'Passwords should match!'
    }
    if (getUsers.find(x => x.name === user.name)) invalid = 'User exist! Choose different username!'
    if(invalid) return setError(invalid)

    setError(null)
    setUsers([...getUsers, user])
    nav('/login')
  }

  return (
    <div className='registration'>
      <h1>User registration</h1>
      <div className='r'>Username: <input ref={usernameRef} type="text" defaultValue='Marius'/></div>
      <div className='r'>Password: <input ref={passOneRef} type="text" defaultValue='gaU@#$%^'/></div>
      <div className='r'>Repeat password: <input ref={passTwoRef} type="text" defaultValue='gaU@#$%^'/></div>
      <div>You will be admin? <input ref={roleRef} type="checkbox"/></div>
      <div><button onClick={registerUser}>Register user</button></div>
      {error && <div>{error}</div>}
    </div>
  )
}

export default RegisterPage