import React, { useState, useRef } from 'react'
import mainContext from '../context/mainContext'
import { useContext } from 'react'

const UserProfilePage = () => {

  const {getUsers, setUsers, getCurrentUser, setCurrentUser} = useContext(mainContext)
  const [error, setError] = useState(null)

  const imageRef = useRef()
  const passRef = useRef()

  function updateImage() {
    const newImage = imageRef.current.value
    setCurrentUser({...getCurrentUser, image: newImage})
    const userIndex = getUsers.findIndex(x => x.name === getCurrentUser.name)
    const updatedUsers = [...getUsers]
    updatedUsers[userIndex].image = newImage
    setUsers(updatedUsers)
    imageRef.current.value = ''
  }

  function updatePass() {
    let invalid = false
    const newPass = passRef.current.value

    if (validatePass(newPass)) {
      invalid = 'Bad password! 4-20 chars and must contain special symbols (!@#$%^&*_+) + uppercase letter!'
    }

    if(invalid) return setError(invalid)
    setError(null)

    setCurrentUser({...getCurrentUser, pass: newPass})
    const userIndex = getUsers.findIndex(x => x.name === getCurrentUser.name)
    const updatedUsers = [...getUsers]
    updatedUsers[userIndex].pass = newPass
    setUsers(updatedUsers)
    passRef.current.value = ''
  }

  function validatePass(text) {
    let result = false
    const reg = /^(?=.*[!@#$%^&*_+])(?=.*[a-z])(?=.*[A-Z]).{4,}$/
    if (text.length < 4 || text.length > 21) result = true
    if (!reg.test(text)) result = true
    return result
  }

  return (
    <div className='userCard'>
      <h1>{getCurrentUser.name} profile</h1>
      <div><img src={getCurrentUser.image} alt="" /></div>
      <div>You are: {getCurrentUser.admin === true ? 'Admin' : 'Regular user'}</div>
      <div>Change your photo:</div>
      <div><input ref={imageRef} type="text" defaultValue='https://aina.lt/wp-content/uploads/2019/05/Dzordana_Butkute1.jpg' /></div>
      <div><button onClick={updateImage}>Change photo</button></div>
      <div>Change your password:</div>
      <div><input ref={passRef} type="text" /></div>
      <div><button onClick={updatePass}>Change password</button></div>
      {error && <div>{error}</div>}      
    </div>
  )
}

export default UserProfilePage