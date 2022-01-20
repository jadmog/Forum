import React from "react";
import { Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    const loggedIn = this.props.setLoggedIn;
    // const isAuthenticated = localStorage.getItem("token");

    return loggedIn ? Component : <Redirect to={{ path: "/login" }} />;
  }
}

export default ProtectedRoute;
