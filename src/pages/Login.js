import React, {useEffect, useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {Datacontext} from "../App"
import styles from './Login.module.css'


export default function Login(props) {

  const {isLoggedIn, setLoggedIn} = useContext(Datacontext)
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const history = useHistory()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://capstoneback.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...loginForm })
      });
      const data = await response.json();
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("username", data.username);
        window.localStorage.setItem("firstname", data.firstname);
        setLoggedIn(true);
        history.push('/')
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedIn(false);
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);


const routeChange = () =>{ 
    history.push('/register');
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
        </>
      ) : (
        <>
          <center>
            <h1>Log In To CryptoTalk</h1>
          </center>
          <form onSubmit={handleLogin}>
            <label>
              {" "}
              Username:{" "}
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={handleLoginChange}
              />
            </label>
            <br />
            <br />
            <label>
              {" "}
              Password:{" "}
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </label>
            <br></br>
            <input type="submit" className={styles.submit_button}/>
          </form>
        </>
      )}
      <br></br>
      <h2>Dont have an account?</h2>
      <button onClick={routeChange} className={styles.signup_button}>Sign up</button>
    </div>
  );
}