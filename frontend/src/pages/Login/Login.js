import React, { useState } from 'react'
import styles from './Login.module.css'
import InputControl from '../../Components/InputControl/InputControl'
import {Link , useNavigate} from "react-router-dom"
import {createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../../firebase'

function Login() {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all the fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
        <InputControl label="Email" placeholder="Enter email address" 
          onChange={event => setValues(prev => ({ ...prev, email: event.target.value }))} />
        <InputControl label="Password" placeholder="Enter Password" type="password"
          onChange={event => setValues(prev => ({ ...prev, pass: event.target.value }))} />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
          <p>
            Don't have an account? {" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
  }
export default Login