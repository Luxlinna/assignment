import { useEffect, useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import { fetchBooks, type Book } from "../api/books";

interface BookListProps {
  onSelect: (book: Book) => void;
}

export default function BookList({ onSelect }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const listRef = useRef<HTMLUListElement>(null);

  const loadBooks = async () => {
    const data = await fetchBooks(0, 1000, search);
    let allBooks = data.content;

    if (search) {
      const lowerSearch = search.toLowerCase();
      interface BookMatch { book: Book; match: boolean; }
      const mapBookToMatch = (book: Book): BookMatch => ({
        book,
        match: book.title.toLowerCase().includes(lowerSearch) || book.author.toLowerCase().includes(lowerSearch),
      });
      const sortBookMatch = (a: BookMatch, b: BookMatch): number => (a.match === b.match ? 0 : a.match ? -1 : 1);
      const mapMatchToBook = (bm: BookMatch): Book => bm.book;
      allBooks = allBooks.map(mapBookToMatch).sort(sortBookMatch).map(mapMatchToBook);
    }

    const pageSize = 20;
    setTotalPages(Math.ceil(allBooks.length / pageSize));
    const pagedBooks = allBooks.slice((page - 1) * pageSize, page * pageSize);
    setBooks(pagedBooks);

    // Focus first book that matches search
    if (pagedBooks.length > 0) {
      onSelect(pagedBooks[0]);
      // scroll to top
      if (listRef.current) listRef.current.scrollTop = 0;
    }
  };

  useEffect(() => { loadBooks(); }, [page]);

  const handleSearch = () => { setPage(1); loadBooks(); };

  const highlightText = (text: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} style={{ backgroundColor: "#ffeb3b" }}>{part}</span> : part
    );
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Search bar */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <TextField
            label="Search by Title or Author"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
        </Stack>
      </Box>

      {/* Book list */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List ref={listRef} sx={{ bgcolor: "background.paper" }}>
          {books.map((book) => (
            <ListItem key={book.id} disablePadding>
              <ListItemButton onClick={() => onSelect(book)}>
                <ListItemText
                  primary={highlightText(book.title)}
                  secondary={highlightText(`Author: ${book.author} | Year: ${book.year}`)}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {books.length === 0 && (
            <Typography variant="body2" textAlign="center" sx={{ p: 2 }}>
              No books found.
            </Typography>
          )}
        </List>
      </Box>

      {/* Pagination */}
      <Box sx={{ py: 1, borderTop: "1px solid #ccc" }}>
        <Stack alignItems="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </Box>
  );
}


