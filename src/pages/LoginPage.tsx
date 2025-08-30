import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [tab, setTab] = useState(0); // 0: Login, 1: Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return unsubscribe;
  }, [navigate]);

  const handleTabChange = (_: any, newValue: number) => setTab(newValue);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tab === 0) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper elevation={6} sx={{ width: "100%", p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            {tab === 0 ? "Login" : "Sign Up"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tab === 0 ? "Welcome back! Please login to continue." : "Create a new account."}
          </Typography>
        </Box>

        <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box component="form" onSubmit={handleEmailAuth} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" size="large">
            {tab === 0 ? "Login" : "Sign Up"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
      </Paper>
    </Container>
  );
}


