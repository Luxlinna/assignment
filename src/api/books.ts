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

const API_URL = "https://assignment-be.jaksmok.com/api/v1";

export async function fetchBooks(page = 0, size = 20, search = "") {
  const username = "sampleId";
  const password = "Secret";

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
  // const API_URL = import.meta.env.VITE_API_URL;
  const username = "sampleId";
  const password = "Secret";

  const authHeader = "Basic " + btoa(`${username}:${password}`);

  const response = await fetch(`${API_URL}/books/${id}`, {
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
