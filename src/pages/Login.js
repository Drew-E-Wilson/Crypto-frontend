import {useEffect, useState} from 'react';
import {Route, Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Register from './Register';

export default function Login(props) {
    // const [fruits, setFruits] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     color: "",
//     isReadyToEat: false
//   });
//   const checkbox = useRef(null);

  /* Authentication */
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const history = useHistory()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...loginForm })
      });
      const data = await response.json();
      console.log(data)
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

  /* END AUTHENTICATION */

//   /* FRUIT CRUD */
//   // Create
//   const createFruit = async (e) => {
//     e.preventDefault();
//     const body = { ...formData };
//     try {
//       const response = await fetch("http://localhost:8080/fruits", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body)
//       });
//       const fruit = await response.json();
//       const addFruit = await fetch(
//         "http://localhost:8080/users/addFruitToUser",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             ...fruit,
//             token: window.localStorage.getItem("token"),
//             username: window.localStorage.getItem("username")
//           })
//         }
//       );
//       const data = await addFruit.json();
//       setFormData({
//         name: "",
//         color: "",
//         isReadyToEat: false
//       });
//       checkbox.current.checked = false;
//     } catch (error) {
//       console.error(err);
//     } finally {
//       await getFruits();
//     }
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };
//   const handleCheckBox = (e) => {
//     const checkedValue = checkbox.current.checked;
//     setFormData({ ...formData, isReadyToEat: checkedValue });
//   };

//   // Read :check:
//   const getFruits = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/users/${window.localStorage.getItem(
//           "username"
//         )}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );
//       const data = await response.json();
//       console.log(data)
//       setFruits([...data.fruits]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Update
//   const updateFruit = async (e, id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/fruits/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(/*updated form data */)
//       });
//       const data = await response.json();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       await getFruits();
//     }
//   };

//   // Delete
//   const deleteFruit = async (e, id) => {
//     try {
//       const response = await fetch(`http://localhost:8080/fruits/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       const data = await response.json(); //<===== DELETED FRUIT
//     } catch (error) {
//       console.error(error);
//     } finally {
//       await getFruits();
//     }
//   };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);
//   useEffect(() => {
//     if (isLoggedIn) {
//       getFruits();
//     }
//   }, [isLoggedIn]);


const routeChange = () =>{ 
    history.push('/register');
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
            {/* <h1>`Hello And Welcome`</h1> */}
            <button onClick={handleLogout}>Log Out Here</button>
        </>
      ) : (
        <>
          <center>
            <h1>Log In To Crypto4Lyfe</h1>
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
            <input type="submit"/>
          </form>
        </>
      )}
      <br></br>
      <h2>Dont have an account?</h2>
      <button onClick={routeChange}>Sign up</button>
    </div>
  );
}