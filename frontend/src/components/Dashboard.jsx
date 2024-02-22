import { useEffect, useState } from "react"
import axios from 'axios';
import Users from "./Users";


function Dashboard() {
  
  const authHeader = window.localStorage.getItem('Authorization');
  const headers = {
    "Authorization":authHeader
  }
  const [balance,setBalance] = useState(0)
  const [currentUser,setCurrentUser] = useState("")
  
  

  useEffect(() =>{
    const fetchData = async() =>{
      try {
        const response = await axios.get('http://localhost:3000/api/v1/accounts/balance',{ headers })
      const userData = await axios.get('http://localhost:3000/api/v1/user/currentUser',{headers})
     
      setBalance(response.data.balance)
      setCurrentUser(userData.data.firstName)
      } catch (error) {
        throw new Error("Error while fetching data")
      }
    }
    
    fetchData()
  },[])
  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center w-full bg-gray-800 p-4 text-white">
        <div>
          <h1 className="text-2xl font-bold">Payments App</h1>
        </div>
        <div>
          <p>Hello, {currentUser}</p>
        </div>
      
      </div>
      <div className="mt-2 ml-3">
        <div>
          <h1 className="text-2xl font-bold">Your balance {balance}</h1>
        </div>
        
        
      </div>
      <div>
        <Users />
      </div>
    </div>
    
    

  )
}

export default Dashboard
