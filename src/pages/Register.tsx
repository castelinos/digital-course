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
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // async function checkConfirmation(confirmation: number) {
  //   try {

  //     console.log("checkong if user is confirmed");
  //     console.log(confirmation);

  //     const response = await fetch(
  //       `${import.meta.env.VITE_APP_API_URL}/get-confirmation`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ confirmation }),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(errorMessage);
  //     }

  //     const data = await response.json();
  //     console.log(data.message);
  //     alert(data.message);
  //   } catch (error) {
  //     alert("user is not confirmed");
  //     console.error("Error during registration:", error);
  //   }
  // }

  async function registerUser(username: string, password: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data.message);
      alert("משתמש נרשם בהצלחה");

      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
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
            <Avatar
              sx={{
                m: 1,
                bgcolor: "primary.light",
                backgroundColor: "#ff8d41",
              }}
            >
              <LockOutlined />
            </Avatar>
            <Typography
              variant="h5"
              sx={{ color: "white", textAlign: "center" }}
            >
              מלא את הפרטים על מנת לקבל גישה לתוכנית
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: "white", textAlign: "right" }}
              >
                :מייל
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                type="email"
                name="email"
                autoFocus
                value={email}
                color="warning"
                InputProps={{
                  style: {
                    color: "#ff8d41",
                    borderColor: "#ff8d41",
                  },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Typography
                variant="body1"
                sx={{ color: "white", textAlign: "right" }}
              >
                :סיסמה לבחירה
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="number"
                value={password}
                color="warning"
                InputProps={{
                  style: {
                    color: "#ff8d41",
                    borderColor: "#ff8d41",
                  },
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 5 }}
                onClick={() => {
                  registerUser(email, password);
                }}
              >
                !קבל גישה עכשיו
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Register;
