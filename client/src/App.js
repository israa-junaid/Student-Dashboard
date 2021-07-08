import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "views/Pages/Login";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import Auth from "layouts/Auth";
import {StudentDataProvider} from "Context/StudentContext";
const App = () => {
  return (
    <div>
      <StudentDataProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />
            <Route path="/rtl" component={RTL} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </BrowserRouter>
      </StudentDataProvider>
    </div>
  );
};

export default App;
