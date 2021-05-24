import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Form from './components/Form';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/reset-password/:userId'>
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
