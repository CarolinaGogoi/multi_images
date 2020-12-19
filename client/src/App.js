import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPages';
import Fibs from './Fibs';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1> Welcome to my App</h1>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
       </header>
       <div>
         <Route exact path="/" component={Fibs} />
         <Route exact path="/otherpage" component={OtherPage} />
       </div>
    </div>
    </Router>
  );
}

export default App;
