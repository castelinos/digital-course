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

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function registerUser(username: string, password: string) {
        try {
            console.log("registering user");
            console.log(username, password);
            
            
            const response = await fetch(`https://female-dynamics-api.onrender.com/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(data.message);
            alert("משתמש נרשם בהצלחה");
        } catch (error) {
            console.error('Error during registration:', error);
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
                            <LockOutlined />
                        </Avatar>
                        <Typography variant="h5" sx={{ color: "white" }}>הרשמה</Typography>
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
                                onClick={() => { registerUser(email, password) }}
                            >
                                test
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default Register;