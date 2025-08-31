export async function fetchBooks(page = 0, size = 20, search = "") {
  const API_URL = "http://assignment-be.jaksmok.com/api/v1";
  const username = "sampleId";
  const password = "Secret";

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
