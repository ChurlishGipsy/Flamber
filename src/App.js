import './App.css';
import Navigation from './Navigation';
import Wallet from './Wallet';
import Calendar from './Calendar';


function App() {
  return (
    <div className="App">
      <Navigation/>
      <div className="content">
        <Wallet/>
        <Calendar/>
      </div>
    </div>
  );
}

export default App;
