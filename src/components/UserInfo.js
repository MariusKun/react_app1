import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserInfo = ({user}) => {

  const navigate = useNavigate()

  function showUserProfile() {
    navigate('/user/'+user.name)
  }

  return (
    <div className='userInfo' onClick={showUserProfile}>
      <h2>{user.name}</h2>
      <div><img src={user.image} alt="" /></div>
      {user.admin === true ? <div>Role: admin</div> : <div>Role: regular user</div>}
    </div>
  )
}

export default UserInfo