import './App.css';
import Navigation from './components/Navigation';
import Wallet from './components/Wallet';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import CreateWallet from './components/CreateWallet';
import RealAssets from './components/RealAssets';
import Auth from './components/Auth';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import UserContextProvider from './contexts/UserContext';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <UserContextProvider>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Wallet/>
              </Route>
              <Route path="/auth">
                <Auth/>
              </Route>
              <Route path="/statistics">
                <Statistics/>
              </Route>
              <Route path="/settings">
                <Settings/>
              </Route>
              <Route path="/create">
                <CreateWallet/>
              </Route>
              <Route path="/real-assets">
                <RealAssets/>
              </Route>
            </Switch> 
          </div>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
