import './App.css';
import Navigation from './components/Navigation';
import Wallet from './components/Wallet';
import History from './components/History';
import Settings from './components/Settings';
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
