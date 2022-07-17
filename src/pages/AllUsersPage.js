import React from 'react'
import mainContext from '../context/mainContext'
import { useContext } from 'react'
import UserInfo from '../components/UserInfo'

const AllUsersPage = () => {

  const {getUsers, getCurrentUser} = useContext(mainContext)
  const usersWithoutCurrentUser = getUsers.filter(user => user.name !== getCurrentUser.name)

  return (
    <div className='d-flex flex-wrap j-center'>
      {usersWithoutCurrentUser.map((x,i) => <UserInfo key={i} user={x}/>)}
    </div>
  )
}

export default AllUsersPage