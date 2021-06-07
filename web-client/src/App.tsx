import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Form from './components/Form';
import Test from "./components/Test";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/testsocket'>
          <Test />
        </Route>
        <Route path='/reset-password/:userId/validation/:token'>
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
