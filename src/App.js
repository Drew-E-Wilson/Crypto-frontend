import React, {useEffect, useState, useRef} from 'react';
import { HashRouter as Router, Link, Switch, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import CryptoDisplay from './pages/CryptoDisplay';
import './App.css';

export const DataContext = React.createContext()




function App() {

    /* Authentication */
    // const [isLoggedIn, setLoggedIn] = useState(false);
    // const [loginForm, setLoginForm] = useState({
    //   username: "",
    //   password: ""
    // });
    // const handleLogin = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const response = await fetch("http://localhost:8080/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({ ...loginForm })
    //     });
    //     const data = await response.json();
    //     if (data.token) {
    //       window.localStorage.setItem("token", data.token);
    //       window.localStorage.setItem("username", data.username);
    //       setLoggedIn(true);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // const handleLogout = () => {
    //   window.localStorage.clear();
    //   setLoggedIn(false);
    // };
  
    // const handleLoginChange = (e) => {
    //   setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
    // };
  
    /* END AUTHENTICATION */

  // const [searchString, setSearchString] = useState([""]);
  // const [searchBarCryptoData, setSearchBarCryptoData] = useState([]);


  // using search bar API
  // const searchCryptoData = async () => {
  //   try { 
  //     const res = await fetch(`https://coingecko.p.rapidapi.com/coins/${searchString}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
  //       "method": "GET",
  //       "headers": {
  //         "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
  //         "x-rapidapi-host": "coingecko.p.rapidapi.com"
  //       }
  //     })
  //     const data = await res.json();
  //     setSearchBarCryptoData(data.results)
  //     setSearchString("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   searchBarCryptoData();
  // }, []);

  // useEffect(() => {
  //   searchBarCryptoData(searchString);
  // }, []);
  
  // function handleChange(event) {
  //   setSearchString(event.target.value);
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   searchCryptoData(searchString);
  // }


  return (
    <DataContext.Provider>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/news">News</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        {/* <h1>Hello World</h1>
        {homeCryptoData.map((crypto) => {
          console.log(crypto)
          return (
            <div key={uuidv4()}>{crypto.id}</div>
          )
        })} */}
        <main>
          <Switch>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/:CryptoId" component={CryptoDisplay} />
            </div>
          </Switch>
        </main>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
