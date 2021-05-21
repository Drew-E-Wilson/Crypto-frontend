import React, {useEffect, useState, useRef, useContext} from 'react';
// import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Datacontext} from "../App"
import styles from './Portfolio.module.css'


export default function Profile(props) {

    
    const history = useHistory();
    // console.log(localStorage.username)
    const {isLoggedIn, setLoggedIn} = useContext(Datacontext)
    const [myCryptoData, setmyCryptoData] = useState({favoritedPage: []});
    console.log(myCryptoData)
    const DisplayFavoritedData = async () => {
        try { 
          const res = await fetch(`http://localhost:8000/users/${window.localStorage.getItem("username")}`)
          const data = await res.json();
          setmyCryptoData(data)
          console.log(JSON.stringify(data.favoritedPage, null, 4));
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        DisplayFavoritedData();
      },[]);

      console.log(myCryptoData)

    const DeleteUser = async () => {
        try { 
          const res = await fetch(`http://localhost:8000/users/${myCryptoData._id}` , {
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
        //   console.log(JSON.stringify(data.favoritedPage, null, 4));
        } catch (error) {
          console.log(error);
        }
      }
    //   useEffect(() => {
    //     DisplayFavoritedData();
    //   },[]);


    const handleLogout = () => {
        window.localStorage.clear();
        setLoggedIn(false);
        history.push('/')
      };


    return (
        // <div></div>
        <div className={styles.portfolio_holder}>
            <h1>Welcome {localStorage.username}</h1>
            {isLoggedIn ? <button onClick={handleLogout}>Log Out</button>: ""}
            <h3>You Favorite Crypto:</h3>
            {myCryptoData ? myCryptoData.favoritedPage.map((data) => {
                console.log(data)
                return (
                    <a href={data.url}><h2 className={styles.crypto_name}>{data.name}</h2></a>
                )
            }): "You're not logged in"}
            {isLoggedIn ? <button onClick={DeleteUser}>Delete Account</button>: ""}
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
//     const response = await fetch(`http://localhost:8000/users/${window.localStorage.getItem("username")}/favoritedPage/${findRemovedItem.name}/${findRemovedItem._id}`, {
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