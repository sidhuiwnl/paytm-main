import axios from 'axios'
import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

function Users() {
    
    const[filter,setFilter] = useState("")
    const [users,setUsers] = useState([])

    useEffect(() =>{
      axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      .then(response =>{
        setUsers(response.data.user)
      })
    },[filter])
  return (
    <>
    <div className='text-2xl font-bold p-3'>Users</div>
    <div className='p-3'>
      <input
      className='w-full border p-2'
      type='text'
      placeholder='Search User...'
      onChange={(e) =>{
        setFilter(e.target.value)
      }}
      ></input>
    </div>
    <div className='p-3'>
      {users.map((user) =><User key={user.id} user={user} />)}
    </div>
    </>
    
  )
}

function User({user}){
  const navigate = useNavigate()
  return (
    <>
    <div className='flex justify-between'>
      <div className='text-2xl font-semibold m-2'>
        {user.firstName} {user.lastName}
      </div>
      <div>
        <button
        className='border p-2 rounded bg-black text-white'
        onClick={()=>{
          navigate(`/Send?id=${user.id}&name=${user.firstName}`)
        }}
        >
            Send Money
        </button>
      </div>
    </div>
    
    </>
  )
}





export default Users
