import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';


function  Signup() {
  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")
  const[firstName,setFirstName] = useState("")
  const[lastName,setLastName] = useState("")
  
  const navigate = useNavigate();
   
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        
            <h1 className="text-2xl font-bold mb-4 text-center">Signup page</h1>
            <p className="text-gray-600 mb-6 ">Enter your information to create an account</p>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">First Name:</label>
                <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="John"
                onChange={(e) =>{
                  setFirstName(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Last Name:</label>
                <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="Doe"
                onChange={(e) =>{
                  setLastName(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Email:</label>
                <input
                className="w-full border p-2 rounded"
                type="email"
                placeholder="sidharth@gmail.com"
                onChange={(e) =>{
                  setUsername(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Password:</label>
                <input
                className="w-full border p-2 rounded"
                type="password"
                placeholder=""
                onChange={(e) =>{
                  setPassword(e.target.value)
                }}
                ></input>
            </div>
            <button 
            className="w-full border p-2 rounded bg-black text-white text-center"
            onClick={async() =>{
              let postData = {
                firstName,
                lastName,
                username,
                password
              }
              const response = await axios.post('http://localhost:3000/api/v1/user/signup',postData)
              console.log('Response:', response);
              window.localStorage.setItem("Authorization","Bearer "+ response.data.token)
              alert(response.data.msg)
              navigate('/Dashboard')
            }}>Sign Up</button>
        
        <div className="flex mt-2">
        <p className="mb-4">Already have an account?</p>
        <Link to='/Signin' className="ml-2 text-blue-700 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}


export default Signup
