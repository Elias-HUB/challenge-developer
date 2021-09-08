import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Profile from "./component/Profile";

import 'fontsource-roboto';

function App() {
    return (
      <BrowserRouter>      
        <Switch>          
          <Route exact path="/Dashboard" component={Dashboard}/>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/Profile" component={Profile}/>
          <Route exact path="/Login" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
