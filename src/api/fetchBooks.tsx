export async function fetchBooks(page = 0, size = 20, search = "") {
  const API_URL = import.meta.env.VITE_API_URL;
  const username = import.meta.env.VITE_API_USERNAME;
  const password = import.meta.env.VITE_API_PASSWORD;

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    search,
  });

  const authHeader = "Basic " + btoa(`${username}:${password}`);

  const response = await fetch(`${API_URL}/books?${params.toString()}`, {
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
