import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Datacontext } from "../App"
import styles from './Profile.module.css'

export default function Profile(props) {

  const history = useHistory();
  const { isLoggedIn, setLoggedIn } = useContext(Datacontext)
  const [editInfo, setEditInfo] = useState(false)
  const [myCryptoData, setmyCryptoData] = useState({ favoritedPage: [] });
  const [userData, setUserData] = useState({})

  const DisplayFavoritedData = async () => {
    try {
      const res = await fetch(`https://crypto-talk.herokuapp.com/users/${window.localStorage.getItem("username")}`)
      const data = await res.json();
      setmyCryptoData(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    DisplayFavoritedData();
  }, []);


  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://crypto-talk.herokuapp.com/users/${window.localStorage.getItem(
          "username"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const data = await response.json();
      setUserData(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const DeleteUser = async () => {
    try {
      const res = await fetch(`https://crypto-talk.herokuapp.com/users/${myCryptoData._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
      });
      const data = await res.json();
      window.localStorage.clear();
      setLoggedIn(false);
      history.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  const editUserInfo = async (e) => {
    try {
      const res = await fetch(`https://crypto-talk.herokuapp.com/users/${myCryptoData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myCryptoData)
        }
      );
      const editedData = res.json();
      setmyCryptoData(myCryptoData)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    setmyCryptoData({ ...myCryptoData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setmyCryptoData(editInfo)
    console.log(editInfo)
  }, [editInfo])


  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedIn(false);
    history.push('/')
  };

  return (
    <div className={styles.profile_holder}>
      <h1>Welcome {localStorage.username}</h1>
      {isLoggedIn ? <button onClick={handleLogout}>Log Out</button> : ""}
      <h3>You Favorite Crypto:</h3>
      {myCryptoData ? myCryptoData.favoritedPage.map((data) => {
        return (
          <a href={data.url}><h2 className={styles.crypto_name}>{data.name}</h2></a>
        )
      }) : "You're not logged in"}
      <div>
        {isLoggedIn ?
          <div>
            <div>
              <h2 className={styles.edit_name}>Edit Account:</h2>
              <form onSubmit={() => {
                setEditInfo()
                editUserInfo()
              }} className={styles.form_holder}>
                User Name: <input type="text" name="username" className={styles.input_box} onChange={handleChange} defaultValue={userData.username} /><br />
                First Name: <input type="text" name="firstname" className={styles.input_box} onChange={handleChange} defaultValue={userData.firstname} /><br />
                Email: <input type="text" name="email" className={styles.input_box} onChange={handleChange} defaultValue={userData.email} /><br />
                <input type="submit" />
              </form>
            </div>
            <div>
              <p>Username: {userData.username}</p>
              <p>First Name: {userData.firstname}</p>
              <p>Email: {userData.email}</p>
            </div>
            <div>
              {isLoggedIn ? <button onClick={DeleteUser}>Delete Account</button> : ""}
            </div>
          </div> : ""}
      </div>
    </div>
  )
}