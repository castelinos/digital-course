import React, { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import '@/assets/css/login.css';

interface Credentials {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function loginUser() {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      console.log("Post submitted");

      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        throw new Error(data.message || "An error occurred");
      }

      console.log("User logged in successfully");
      

      login(credentials.username, credentials.password);
      navigate('/home');
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    console.log(credentials);
    
  };

  return (
    <div className="loginContainer">
      {isLoading ? (
        <div className="loaderContainer">
          <Typography variant="h4" component="h1">...רק עוד כמה רגעים</Typography>
          <CircularProgress />
        </div>
      ) : (
        <Container maxWidth="xs" className="loginSubContainer">
          <CssBaseline />
          <Box sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Avatar sx={{ m: 1, bgcolor: "primary.light", backgroundColor: '#ff8d41' }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" sx={{ color: "white" }}>כניסה לחשבון</Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={(e) => {
              e.preventDefault();
              loginUser();
            }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoFocus
                value={credentials.username}
                onChange={handleChange}
                color="warning"
                InputProps={{
                  style: {
                    color: "#ff8d41",
                    borderColor: "#ff8d41"
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                color="warning"
                InputProps={{
                  style: {
                    color: "#ff8d41",
                    borderColor: "#ff8d41"
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="warning"
              >
                התחבר
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Login;
