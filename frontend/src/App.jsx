import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import { userDataContext } from './context/userContext'
import { useContext } from 'react'
import Home from './pages/Home'
import Customize2 from './pages/Customize2'

const App = () => {
  const { userData,setUserData } = useContext(userDataContext);
  // const Navigate = useNavigate();
  return (
    
   <Routes>
      <Route path="/" element={(userData?.assistantImage && userData?.assistantImage)? <Home /> : <Navigate to={"/customize"} />} />

      <Route path="/signup" element={ !userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path="/signin" element={ !userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path="/customize" element={userData ? <Customize /> : <Navigate to={"/signup"} />} />
      <Route path="/customize2" element={userData ? <Customize2 /> : <Navigate to={"/signup"} />} />
   </Routes>
  )
}

export default App