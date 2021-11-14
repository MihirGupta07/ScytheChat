
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './login'
//import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React,{useState} from 'react';
import { useStateValue } from './StateProvider';

function App() {
  // const [user, setuser] = useState(null);
  const [{user}, dispatch] = useStateValue();
  return (
    <div className="app">

      <div className="app__body">
        {!user ?
          (
            <Login/>
          ) : (
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          )}
      </div>
    </div>
  );
}

export default App;
