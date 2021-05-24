import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Testing from './components/Testing';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/reset-password'>
          <Testing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
