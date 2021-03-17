import './App.css';
import Navigation from './components/Navigation';
import Wallet from './components/Wallet';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import CreateWallet from './components/CreateWallet';
import EditModelAssets from './components/EditModelAssets';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 



function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Wallet/>
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
            <Route path="/edit-assets">
              <EditModelAssets/>
            </Route>
          </Switch> 
        </div>
      </div>
    </Router>
  );
}

export default App;
