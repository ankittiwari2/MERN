import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

//import Home from './components/Home/Home';
import Person from './components/Person/Person';
import Login from './components/Person/Login'
import AddTask from './components/Person/AddTask'
import ViewTask from './components/Person/ViewTask'

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Signup">Signup</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/AddTask">Add Task</Link>
          </li>
          <li>
            <Link to="/ViewTask">View Task</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/Signup">
            <Person />
          </Route>
          <Route path="/Login">
          <Login />
          </Route>
          <Route path="/AddTask">
          <AddTask />
          </Route>
          <Route path="/viewTask">
          <ViewTask />
          </Route>
          
        </Switch>
      </div>
    </Router>

  );
}





export default App;
