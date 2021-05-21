import React, {useEffect, useState, useRef, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Datacontext} from "../App"
import styles from './Profile.module.css'


export default function Profile(props) {

    
    const history = useHistory();
    const {isLoggedIn, setLoggedIn} = useContext(Datacontext)
    const [editInfo, setEditInfo] = useState(false)
    const [myCryptoData, setmyCryptoData] = useState({favoritedPage: []});
    const [userData, setUserData] = useState({})


    const DisplayFavoritedData = async () => {
        try { 
          const res = await fetch(`https://capstoneback.herokuapp.com/users/${window.localStorage.getItem("username")}`)
          const data = await res.json();
          setmyCryptoData(data)
          // console.log(JSON.stringify(data.favoritedPage, null, 4));
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        DisplayFavoritedData();
      },[]);


      const getUserData = async () => {
        try {
          const response = await fetch(
          `https://capstoneback.herokuapp.com/users/${window.localStorage.getItem(
            "username"
          )}`,
          {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            }}
          );
          const data = await response.json();
                setUserData(data)
                console.log(data)
        } catch(err) {
          console.log(err)
        }
      }
    
        useEffect(()=> {
            getUserData()
            console.log(userData)
        }, [])

    const DeleteUser = async () => {
        try { 
          const res = await fetch(`https://capstoneback.herokuapp.com/users/${myCryptoData._id}` , {
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

        try{
            const res = await fetch(`https://capstoneback.herokuapp.com/users/${myCryptoData._id}`,
                {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    // "Authorization" : "Bearer " + window.localStorage.getItem("token")
                    },
                    body: JSON.stringify(myCryptoData) 
                  
                }
            );
            const editedData = res.json();
            // console.log(myCryptoData)
            setmyCryptoData(myCryptoData)
            console.log(myCryptoData)
            // console.log()
            
        } catch (err){
            console.error(err)
        }
    }
    // useEffect(() => {
    //   editUserInfo()
    //   console.log(myCryptoData)
    // })

    const handleChange = (e) => {
      setmyCryptoData({...myCryptoData, [e.target.name]: e.target.value})
        // console.log(myCryptoData)
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
            {isLoggedIn ? <button onClick={handleLogout}>Log Out</button>: ""}
            <h3>You Favorite Crypto:</h3>
            {myCryptoData ? myCryptoData.favoritedPage.map((data) => {
                // console.log(data)
                return (
                    <a href={data.url}><h2 className={styles.crypto_name}>{data.name}</h2></a>
                )
            }): "You're not logged in"}
            {/* {isLoggedIn ? <button onClick={DeleteUser}>Delete Account</button>: ""} */}
            {/* {<button onClick={() => setEditInfo(!editInfo)}>{editInfo? "Cancel" : "Edit"}</button>}
            {editInfo ? <button onClick={DeleteUser}>Delete Account</button> : ""}  */}
            <div>
            {isLoggedIn ?
            <div>
                <div>
                    {/* <button onClick={() => setEditInfo(!editInfo)}>{editInfo? "Cancel" : "Edit"}</button> */}
                     {isLoggedIn ? <button onClick={DeleteUser}>Delete Account</button>: ""}
                    {/* {editInfo ? <button onClick={DeleteUser}>Delete Account</button> : ""}  */}
                </div>
                {/* {editInfo ?  */}
                    <div>
                        <h2>Edit Account:</h2>
                        {/* <form onSubmit={setEditInfo} onSubmit={editUserInfo}> */}
                        <form onSubmit={() => {
                          setEditInfo()
                          editUserInfo()
                        }}>
                            User Name: <input type="text" name="username" onChange={handleChange} defaultValue={userData.username}/><br />
                            First Name: <input type="text" name="firstname" onChange={handleChange} defaultValue={userData.firstname} /><br />
                            Email: <input type="text" name="email" onChange={handleChange} defaultValue={userData.email}/><br />
                            <input type="submit" />
                        </form>
                    </div>
                    <div>
                        <p>Username: {userData.username}</p>
                        <p>First Name: {userData.firstname}</p>
                        <p>Email: {userData.email}</p>
                    </div>
              </div>:""}
                  </div> 
        </div>
  )
}



// const findRemovedItem = myCryptoData.favoritedPage.map((remove) => {
//     console.log({"name": remove.name, "id": remove._id})
//     return ({"name": remove.name, "id": remove._id}) 
//     })

// //delete favoritedPage from profile
// const deleteFavorited = async (_id, name) => {
//   try {
//     const response = await fetch(`https://capstoneback.herokuapp.com/users/${window.localStorage.getItem("username")}/favoritedPage/${findRemovedItem.name}/${findRemovedItem._id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + window.localStorage.getItem("token")
//       }
//     });
//     const data = await response.json();
//     console.log(data)
//   } catch (error) {
//     console.error(error);
//   } 
//   finally {
//     await DisplayFavoritedData();
//   }
// };

// function handleDelete(e) {
//       console.log(e)
//       deleteFavorited(e);
//     };