import React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import "../assets/css/login.css";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
    

  async function loginUser(username: string, password: string) {
    try {
      const response = await fetch(`https://female-dynamics-api.onrender.com:10000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      login(username, password);
      navigate('/home');
    } catch (error: any) {
      console.error('Error during login:', error.message);
    }
  }


  return (
    <>
      <div className="loginContainer">
        <Container maxWidth="xs" className="loginSubContainer">
          <CssBaseline />
          <Box
            sx={{
              mt: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light", backgroundColor: '#ff8d41' }}  >
              <LockOutlined  />
            </Avatar>
            <Typography variant="h5" sx={{ color: "white"}}>כניסה לחשבון</Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoFocus
                value={email}
                color="warning"
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                color="warning"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => { loginUser(email, password) }}
                color="warning"
              >
                התחבר
              </Button>
              {/* <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {registerUser("test", "test")}}
            >
              test
            </Button> */}
            </Box>
          </Box>
        </Container>
      </div>
    </>
  )
}

export default Login;