import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

function Signin() {
  const [username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const navigate = useNavigate();

    

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-sm'>
        
            <h1 className='text-2xl font-bold text-center w-full mb-4'>Sign In</h1>
            <p className='text-gray-600 mb-6'>Enter your credentials to access your account</p>
            <div className='mb-4'>
                <label className='block font-semibold'>Email:</label>
                <input
                className='border w-full rounded p-2'
                type="email"
                placeholder="sidharth@gmail.com"
                onChange={(e) =>{
                  setUsername(e.target.value)
                }}
                ></input>
            </div>
            <div className='mb-4'>
                <label className='block font-semibold '>Password:</label>
                <input
                className='border w-full rounded p-2'
                type="password"
                placeholder=""
                onChange={(e) =>{
                  setPassword(e.target.value)
                }}
                ></input>
            </div>
            <button onClick={async() =>{
              const postData = {
                username,
                password
              }
              const response = await axios.post('http://localhost:3000/api/v1/user/signin',postData)
              console.log(response.data.token)
              window.localStorage.setItem("Authorization","Bearer "+response.data.token)
              
              
              navigate('/Dashboard')
            }}className='mb-4 w-full bg-black text-white rounded p-2'>Sign In</button>
        
        <div className='flex'>
            <p className='text-gray-600'>Dont have an account? </p>
            <Link to='/Signup' className='ml-2 text-blue-600 hover:underline'>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Signin
