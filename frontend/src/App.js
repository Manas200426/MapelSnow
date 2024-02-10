
import { useEffect, useState } from 'react';

import {auth} from "./firebase"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
function App() {
  const [userName,setUserName] = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUserName(user.displayName)
      }else setUserName("")
      
    })
  },[])

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home name={userName}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
