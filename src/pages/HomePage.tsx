import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookList from "../components/BookList";
import BookDetail from "../components/BookDetail";
import type { Book } from "../api/books";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // restore on unmount
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden", // prevent scrolling
      }}
    >
      {/* Navbar full width */}
      <Navbar onLogout={handleLogout} />

      {/* Main content: BookList + BookDetail */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        {/* BookList 30% on desktop, top on mobile */}
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            height: { xs: "50%", md: "100%" },
            borderRight: { xs: "none", md: "1px solid #ccc" },
            borderBottom: { xs: "1px solid #ccc", md: "none" },
            overflowY: "auto", // scroll only inside
          }}
        >
          <BookList onSelect={setSelectedBook} />
        </Box>

        {/* BookDetail 70% on desktop, bottom on mobile */}
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            height: { xs: "50%", md: "100%" },
            overflowY: "auto", // scroll only inside
          }}
        >
          <BookDetail book={selectedBook} />
        </Box>
      </Box>

      {/* Footer full width */}
      <Footer />
    </Box>
  );
}

