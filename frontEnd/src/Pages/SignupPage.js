import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios'

export default function SignupPage() {

  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")


  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/login/register",
      timeout: 4000
    }).then((res) => console.log(res))
  }

  return (
    <div>
      <center>
        <div>
          <TextField
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
            id="outlined-required"
            label="Username"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </div>
        <br></br>
        <div>
          <Button variant="contained" color="success" onClick={register}><Link to='/login' style={{ textDecoration: 'none', color: "white" }}>Create user</Link></Button>
        </div>
      </center>
    </div>
  )
}