import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Form from './components/Form';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/reset-password/:userId/validation/:token'>
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
