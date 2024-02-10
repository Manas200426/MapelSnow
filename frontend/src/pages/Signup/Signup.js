import React, { useState } from 'react'
import styles from './Signup.module.css'
import InputControl from '../../Components/InputControl/InputControl'
import {Link , useNavigate} from "react-router-dom"
import {createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import {auth} from '../../firebase'

function Signup() {
  const [values, setvalues] = useState({
    name:"",
    email:"",
    pass:"",
  })
  const navigate = useNavigate()
  const [errorMsg,setErrorMsg] = useState("")
  const [submitButtonDisabled,setSubmitButtonDisabled] = useState(false)

  const handelSubmission=()=>{
    if(!values.name || !values.email || !values.pass){
      setErrorMsg("Fill all the fields")
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true)
    createUserWithEmailAndPassword(auth,values.email,values.pass)
    .then(async(res)=>{
      setSubmitButtonDisabled(false)
      const user = res.user;
      await updateProfile(user,{
        displayName : values.name
      })
      navigate("/")
    })
    .catch((err)=>{
    setSubmitButtonDisabled(false);
    setErrorMsg(err.message)
    })
  }
   
  return (
    <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Signup</h1>

          <InputControl lable="Name" placeholder="Enter your Name" 
          onChange={(event)=>
          setvalues((prev) => ({ ...prev,name: event.target.value}))} />
          <InputControl lable="Email" placeholder="Enter email adress"
          onChange={(event)=>
            setvalues((prev) => ({ ...prev,email: event.target.value}))}/>
          <InputControl lable="Password" placeholder="Enter Password"
          onChange={(event)=>
            setvalues((prev) => ({ ...prev,pass: event.target.value}))}/>

          <div className={styles.footer}>
            <b className={styles.errorMsg}>{errorMsg}</b>
            <button onClick={handelSubmission} disabled={submitButtonDisabled}>Signup</button>
            <p>
              Already have an account ? {" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
    </div>
  )
}

export default Signup