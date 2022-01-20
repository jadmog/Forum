import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import { Button } from "@material-ui/core";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Axios from "axios";


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export default function LogOut(props) {
  // const [loggedIn, setLoggedIn] = useState(props.LoggedIn);
  const [loginUsername, setLoginUsername] = useState(props.LoginUsername);
  const logout = () => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/login/logout",
    }).then((res) => {
      console.log(res);
      if (res.data === "User Logged out") {
        props.setLoggedIn(false);
        setLoginUsername("");
      } else {
        console.log("Logout failed");
      }
      console.log(props.loggedIn);
      // if (!props.loggedIn) {
      // }
    });
  };
  if (!props.loggedIn) {
    return <Redirect to="/login" />;
  }
  return props.loggedIn ? <ColorButton variant="contained" onClick={logout}>Log out</ColorButton> : "";
}
