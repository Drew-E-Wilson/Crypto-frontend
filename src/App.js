import React, {useEffect, useState, useRef} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import CryptoDisplay from './pages/CryptoDisplay';
import Profile from './pages/Profile';
import News from './pages/News';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

export const DataContext = React.createContext()


function App() {

  return (
    <DataContext.Provider>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          {/* <Link to="/news">News</Link> */}
          {/* <Link to="/settings">Settings</Link> */}
          <Link to="login">Login</Link>
        </nav>
        <main>
          <Switch>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/crypto/:CryptoId" component={CryptoDisplay} />
              <Route path="/profile" exact component={Profile} Login={Login}/>
              <Route path="/news" exact component={News}/>
              <Route path="/settings" exact component={Settings}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
            </div>
          </Switch>
        </main>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
