import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CssBaseline,
  Container,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import './Login.css';
import { useNavigate } from 'react-router-dom';  

export default function Login() {
  // Hardcoded credentials
  const correctEmail = 'admin@linkme.com';
  const correctPassword = 'admin123';
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;

    // Reset error states
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');

    // Check if the entered email and password match the hardcoded credentials
    if (email !== correctEmail) {
      setEmailError(true);
      setEmailErrorMessage('Email is incorrect.');
      valid = false;
    }

    if (password !== correctPassword) {
      setPasswordError(true);
      setPasswordErrorMessage('Password is incorrect.');
      valid = false;
    }

    if (valid) {
      // Handle successful login
      navigate('/home');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} className="login-container">
        <Typography component="h1" variant="h4" className="login-title">
          LinkMe - Admin Portal
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate className="login-form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailErrorMessage}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordErrorMessage}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="login-submit"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
