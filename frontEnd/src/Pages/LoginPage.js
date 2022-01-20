import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
//import Button from "@material-ui/core/Button";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

export default function LoginPage(props) {
  // const [loginUsername, setLoginUsername] = useState("");
  // var loginUsername = props.loginUsername
  // var setLoginUsername = props.setLoginUsername
  const [loginPassword, setLoginPassword] = useState("");
  const setLoggedIn = props.setLoggedIn;
  const setPath = props.setPath;
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: props.loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/login/login",
    }).then((res) => {
      console.log(res);
      if (res.data === "Successfully Authenticated") {
        setLoggedIn(true);
        setPath('homepage')
        // setLoginUsername(props.loginUsername)
        console.log('loginpageUsername', props.loginUsername);
      } else {
        alert("Wrong credentials");
      }
    });
  };

  if (props.loggedIn) {
    return <Redirect to={{ pathname: `/homepage/${props.loginUsername}` }} />;
  }
  return (
    <div>
      <center>
        <div>
          <TextField
            onChange={(e) => props.setLoginUsername(e.target.value)}
            // onChange={(e) => loginUsername = e.target.value}
            required
            id="outlined-required"
            label="Username"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </div>
        <br></br>
        <Stack spacing={2}>
          <div>
            <Button variant="contained" color="success" onClick={login}>
              Login
            </Button>
          </div>
          <div>
            <Button variant="contained" color="success">
              <Link to="/signup" style={{ textDecoration: 'none', color: "white" }}>
                Sign up
              </Link>
            </Button>
          </div>
        </Stack>
      </center>
    </div >
  );
}
