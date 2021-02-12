import './App.css';
import Navigation from './Navigation';
import Wallet from './Wallet';
import History from './History';
import Settings from './Settings';
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
            <Route path="/history">
              <History/>
            </Route>
            <Route path="/settings">
              <Settings/>
            </Route>
          </Switch> 
        </div>
      </div>
    </Router>
  );
}

export default App;
