import React, { Suspense } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import SendMoney from './components/SendMoney'
const Signinpage = React.lazy(() => import('./components/Signin')) 
const Signuppage = React.lazy(() => import('./components/Signup')) 
const Dashboardpage = React.lazy(() => import('./components/Dashboard')) 

function App() {

  return (
    <div>
      <RecoilRoot>
        <Suspense fallback={<div>Loading....</div>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signuppage/>} />
            <Route path='/Signin' element={<Signinpage/>} />
            <Route path='/Dashboard' element={<Dashboardpage/>} />
            <Route path='/Send' element={<SendMoney/>}/>
          </Routes>
        </BrowserRouter>
        </Suspense>
      </RecoilRoot>
        
    </div>
  )
}

export default App
