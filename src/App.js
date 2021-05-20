import './App.css';
import Navigation from './components/navigation/Navigation';
import Wallet from './components/Wallet';
import Home from './components/Home';
import Overview from './components/Overview';
import Settings from './components/Settings';
import CreateWallet from './components/CreateWallet';
import RealAssets from './components/RealAssets';
import UpdateAssets from './components/UpdateAssets';
import ForgotPassword from './components/auth/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import UserContextProvider from './contexts/UserContext';
import {createMuiTheme, ThemeProvider } from '@material-ui/core';
import AuthContextProvider from './contexts/AuthContext';
import About from './components/About';

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
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
              <Route path="/about" component={About}></Route>
            </Switch>
            <UserContextProvider>
              <div  className="App">
              <Navigation/>
              <div className="content">
                <Switch>
                  <PrivateRoute path="/model-assets" component={Wallet}/>
                  <PrivateRoute path="/overview" component={Overview}/>
                  <PrivateRoute path="/settings" component={Settings}/>
                  <PrivateRoute path="/create" component={CreateWallet}/>
                  <PrivateRoute path="/real-assets" component={RealAssets}/>
                  <PrivateRoute path="/update-assets" component={UpdateAssets}/>
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
