import axios from 'axios';
import  { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount,setAmount] = useState(0)
  const to = searchParams.get('id');
  const authHeader = window.localStorage.getItem('Authorization')
  const headers = {
    'Authorization' : authHeader
  }

  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">To {searchParams.get('name')}</h1>
        <input
          type="text"
          placeholder="Amount"
          className="w-full border border-gray-300 p-2 mb-4"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></input>
        <button
          onClick={async () => {
             await axios.post(
              'http://localhost:3000/api/v1/accounts/transfer',{
                to : to,
                amount : amount,
              },{
                headers
              }
              
            );
            
          }}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send Money
        </button>
      </div>
    </div>
  );
}

export default SendMoney;
