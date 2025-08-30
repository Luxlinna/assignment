export interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  country: string;
  language: string;
  pages: number;
  wikipediaLink: string;
  imageUrl: string;
}

export async function fetchBooks(page = 0, size = 20, search = "") {
  const username = import.meta.env.VITE_API_USERNAME;
  const password = import.meta.env.VITE_API_PASSWORD;

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    search,
  });

  const authHeader = "Basic " + btoa(`${username}:${password}`);

  // Using proxy `/api` -> rewritten by Vite to real backend
  const response = await fetch(`/api/books?${params.toString()}`, {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return response.json();
}
export const fetchBookById = async (id: number) => {
  const username = import.meta.env.VITE_API_USERNAME;
  const password = import.meta.env.VITE_API_PASSWORD;

  const authHeader = "Basic " + btoa(`${username}:${password}`);

  const response = await fetch(`/api/books/${id}`, {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch book: ${response.status}`);
  }

  return response.json();
};

