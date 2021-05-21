import React, {useEffect, useState, useRef, useContext} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import CryptoDisplay from './pages/CryptoDisplay';
import Profile from './pages/Profile';
import News from './pages/News';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

export const Datacontext = React.createContext()


function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Datacontext.Provider value={{isLoggedIn, setLoggedIn}}>
      <Router>
        <nav>
          <div>
            <h1 className="sitename">CryptoTalk</h1>
          </div>
          <div>
            <Link to="/" className="links">Home</Link>
            <Link to="/profile" className="links">Profile</Link>
            {/* <Link to="/news">News</Link> */}
            {/* <Link to="/settings">Settings</Link> */}
            <Link to="login" className="links">Login</Link>
          </div>
        </nav>
        <main>
          <Switch>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/crypto/:CryptoId" component={CryptoDisplay} />
              <Route path="/profile" exact component={Profile}/>
              {/* <Route path="/news" exact component={News}/>
              <Route path="/settings" exact component={Settings}/> */}
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
            </div>
          </Switch>
        </main>
      </Router>
    </Datacontext.Provider>
  );
}

export default App;
