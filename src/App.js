import './App.css';
import Navigation from './components/Navigation';
import Wallet from './components/Wallet';
import Overview from './components/Overview';
import Settings from './components/Settings';
import CreateWallet from './components/CreateWallet';
import RealAssets from './components/RealAssets';
import UpdateAssets from './components/UpdateAssets';
import Auth from './components/Auth';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import UserContextProvider from './contexts/UserContext';
import {createMuiTheme, ThemeProvider } from '@material-ui/core';

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
        </UserContextProvider>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
