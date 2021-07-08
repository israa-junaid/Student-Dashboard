import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";


import routes from "routes.js";

import pagesStyle from "assets/jss/material-dashboard-react/layouts/authStyle.js";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
  </Switch>
);

class Pages extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
 
  getActiveRoute = routes => {
    let activeRoute = "Default";
    //incase of wrong url enter with /auth returns to the default page
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <AuthNavbar brandText={this.getActiveRoute(routes)} {...rest} />
        <div className={classes.wrapper}>
          <div
            className={classes.fullPage}
          
          >
            {switchRoutes}
        
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};


 export default withStyles(pagesStyle)(Pages);
