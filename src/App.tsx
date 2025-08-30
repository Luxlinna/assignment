import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; // Adjust the path if your firebase config is elsewhere

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setIsAuthenticated(!!user));
    return unsubscribe;
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;


