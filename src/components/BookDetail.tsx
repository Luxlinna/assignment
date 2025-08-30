import { Card, CardContent, CardMedia, Typography, Link, Box } from "@mui/material";
import type { Book } from "../api/books";

interface BookDetailProps {
  book?: Book;
}

export default function BookDetail({ book }: BookDetailProps) {
  if (!book)
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Select a book to see details</Typography>
      </Box>
    );

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", md: "70%", lg: "70%" },
          objectFit: "contain",
          p: 2,
          maxHeight: { xs: 300, md: "100%" },
        }}
        image={book.imageUrl}
        alt={book.title}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Author: {book.author}
        </Typography>
        <Typography variant="body2">Year: {book.year}</Typography>
        <Typography variant="body2">Country: {book.country}</Typography>
        <Typography variant="body2">Language: {book.language}</Typography>
        <Typography variant="body2" gutterBottom>
          Pages: {book.pages}
        </Typography>
        <Box mt={2}>
          <Link href={book.wikipediaLink} target="_blank" rel="noopener" underline="hover">
            Read on Wikipedia
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}

