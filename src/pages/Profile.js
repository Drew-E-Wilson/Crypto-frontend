import {useEffect, useState} from 'react';

export default function Profile(props) {
    // console.log(localStorage.username)
    const [myCryptoData, setmyCryptoData] = useState({favoritedPage: []});
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

    return (
        // <div></div>
        <div>
            <h1>Welcome {localStorage.username}</h1>
            {myCryptoData.favoritedPage.map((data) => {
                console.log(data)
                return (
                    <a href={data.url}><h2>{data.name}</h2></a>
                )
            })}
        </div>
    )
}

// const addFavoritedToUser = async (e) => {
  
//     try {
//       const response = await fetch(
//         `http://localhost:8000/users/addFavoritedPage/${savedCryptoData}/${window.localStorage.getItem("username")}`,
//         {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + window.localStorage.getItem("token")
//         }
//         }
//       );
//       const data = await response.json();
//       console.log(data)

//     } catch (error) {
//       console.error(error);
//     }
//   }