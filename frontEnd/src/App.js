import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SubjectPage from "./Pages/SubjectPage";
import HomePage from "./Pages/HomePage";
import ThreadPage from "./Pages/ThreadPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import LogOut from "./components/LogOut";
import ProtectedRoute from "./ProtectedRoute";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const [loggedIn, setLoggedIn] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [path, setPath] = useState("");
  return (
    <div>
      {console.log('App.js loginUsername', loginUsername)}
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
              <AppBar>
                <Toolbar>
                  <Typography variant="h6">My Forum</Typography>
                  <div style={{ marginLeft: 'auto' }}><LogOut
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    loginUsername={loginUsername}
                    setLoginUsername={setLoginUsername}
                  /></div>
                </Toolbar>
              </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container>
              <Box my={2}>
                <Route path="/subjects/:username/:subject/:thread"
                  component={ThreadPage}
                  loggedIn={loggedIn}
                  loginUsername={loginUsername}
                  setLoggedIn={setLoggedIn}
                  setLoginUsername={setLoginUsername} >
                  <ThreadPage
                    loggedIn={loggedIn}
                    loginUsername={loginUsername}
                    setLoggedIn={setLoggedIn}
                    setLoginUsername={setLoginUsername} />
                </Route>
                <Route
                  exact
                  path="/subjects/:username/:subject"
                  component={SubjectPage}
                  loggedIn={loggedIn}
                  loginUsername={loginUsername}
                  setLoggedIn={setLoggedIn}
                  setLoginUsername={setLoginUsername}
                >
                  <SubjectPage
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    loginUsername={loginUsername}
                    setLoginUsername={setLoginUsername}
                  />
                </Route>
                <Route path="/signup">
                  <SignupPage />
                </Route>
                <Route path="/login">
                  <LoginPage
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    loginUsername={loginUsername}
                    setLoginUsername={setLoginUsername}
                    path={path}
                    setPath={setPath}
                  />
                </Route>
                {(loggedIn && path === 'homepage') && < ProtectedRoute
                  path="/homepage/:username/"
                  component={<HomePage
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    loginUsername={loginUsername}
                    setLoginUsername={setLoginUsername}
                    path={path}
                    setPath={setPath}
                  />}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  loginUsername={loginUsername}
                  setLoginUsername={setLoginUsername}
                  path={path}
                  setPath={setPath}
                >
                </ProtectedRoute>}
              </Box>
            </Container>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    </div >
  );
}
