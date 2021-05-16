import './App.css';
import Navigation from './components/navigation/Navigation';
import Wallet from './components/Wallet';
import Home from './components/Home';
import Overview from './components/Overview';
import Settings from './components/Settings';
import CreateWallet from './components/CreateWallet';
import RealAssets from './components/RealAssets';
import UpdateAssets from './components/UpdateAssets';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import UserContextProvider from './contexts/UserContext';
import {createMuiTheme, ThemeProvider } from '@material-ui/core';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
       main: '#E6AF2E',
    },
    secondary: {
      main: 'rgb(25, 48, 150)'
    }
    
  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router>
          <div className="wrapper">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
            </Switch>
            <UserContextProvider>
              <div  className="App">
              <Navigation/>
              <div className="content">
                <Switch>
                {/* <Route exact path="/">
                    <Home/>
                  </Route> */}
                  <Route path="/model-assets">
                    <Wallet/>
                  </Route>
                  <Route path="/overview">
                    <Overview/>
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
                  <Route path="/update-assets">
                    <UpdateAssets/>
                  </Route>
                </Switch> 
              </div>
              </div>
            </UserContextProvider>
          </div>
        </Router>
        </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
