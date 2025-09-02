# import os
# import base64
# import pytest
# import requests

# # Load API config from environment, fallback to defaults
# API_URL = os.getenv("API_URL", "http://assignment-be.jaksmok.com/api/v1")
# USERNAME = os.getenv("API_USERNAME", "sampleId")
# PASSWORD = os.getenv("API_PASSWORD", "Secret")


# def get_auth_headers():
#     """Return HTTP headers with Basic Auth."""
#     token = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
#     return {
#         "Authorization": f"Basic {token}",
#         "Content-Type": "application/json"
#     }


# def test_books_list():
#     """Test fetching paginated list of books."""
#     url = f"{API_URL}/books?page=0&size=5"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200, f"Unexpected status {resp.status_code}"
#     data = resp.json()
#     assert "content" in data, "Response missing 'content'"
#     assert isinstance(data["content"], list)


# @pytest.mark.parametrize("book_id", [1, 2, 3])
# def test_book_detail(book_id):
#     """Test fetching book by ID (should exist or return 404)."""
#     url = f"{API_URL}/books/{book_id}"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code in [200, 404], f"Unexpected {resp.status_code}"
#     if resp.status_code == 200:
#         data = resp.json()
#         assert "id" in data
#         assert data["id"] == book_id


# def test_search_books():
#     """Test search filter works on books endpoint."""
#     url = f"{API_URL}/books?search=tolstoy"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200
#     data = resp.json()
#     assert "content" in data
#     assert isinstance(data["content"], list)







# tests/test_api.py
import os
import base64
import pytest
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

API_URL = os.getenv("API_URL", "http://assignment-be.jaksmok.com/api/v1")
USERNAME = os.getenv("API_USERNAME", "sampleId")
PASSWORD = os.getenv("API_PASSWORD", "Secret")


def get_auth_headers(username=USERNAME, password=PASSWORD):
    """Helper to build Basic Auth header."""
    token = base64.b64encode(f"{username}:{password}".encode()).decode()
    return {"Authorization": f"Basic {token}", "Content-Type": "application/json"}


# @pytest.mark.parametrize("endpoint", ["/actuator/health", "/ping", "/health"])
# def test_health_endpoints(endpoint):
#     """Try common health endpoints and skip if not found."""
#     url = f"{API_URL}{endpoint}"
#     resp = requests.get(url, headers=get_auth_headers())
#     if resp.status_code == 404:
#         pytest.skip(f"{endpoint} not implemented on API")
#     assert resp.status_code == 200


def test_books_list():
    url = f"{API_URL}/books?page=0&size=5"
    resp = requests.get(url, headers=get_auth_headers())
    assert resp.status_code == 200
    data = resp.json()
    assert "content" in data
    assert isinstance(data["content"], list)


@pytest.mark.parametrize("book_id", [1, 2, 3])
def test_book_detail(book_id):
    url = f"{API_URL}/books/{book_id}"
    resp = requests.get(url, headers=get_auth_headers())
    assert resp.status_code in [200, 404]
    if resp.status_code == 200:
        data = resp.json()
        assert "id" in data
        assert data["id"] == book_id


def test_search_books():
    url = f"{API_URL}/books?search=tolstoy"
    resp = requests.get(url, headers=get_auth_headers())
    assert resp.status_code == 200
    data = resp.json()
    assert "content" in data
    assert isinstance(data["content"], list)


def test_unauthorized_access():
    """Verify API returns 401 with wrong credentials."""
    bad_headers = get_auth_headers("wrongUser", "wrongPass")
    url = f"{API_URL}/books"
    resp = requests.get(url, headers=bad_headers)
    assert resp.status_code == 401


def test_stress_books_endpoint():
    """Send multiple concurrent requests to /books to check stability / rate limits."""
    url = f"{API_URL}/books?page=0&size=1"

    def fetch():
        return requests.get(url, headers=get_auth_headers()).status_code

    status_codes = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(fetch) for _ in range(20)]
        for f in as_completed(futures):
            status_codes.append(f.result())

    # All should be either 200 (success) or 429 (rate limited)
    assert all(code in [200, 429] for code in status_codes)

    # Ensure at least one succeeded
    assert 200 in status_codes











# import os
# import base64
# import pytest
# import requests

# API_URL = os.getenv("API_URL", "http://assignment-be.jaksmok.com/api/v1")
# USERNAME = os.getenv("API_USERNAME", "sampleId")
# PASSWORD = os.getenv("API_PASSWORD", "Secret")


# def get_auth_headers(username=USERNAME, password=PASSWORD):
#     """Helper to build Basic Auth header."""
#     token = base64.b64encode(f"{username}:{password}".encode()).decode()
#     return {"Authorization": f"Basic {token}", "Content-Type": "application/json"}


# @pytest.mark.parametrize("endpoint", ["/actuator/health", "/ping", "/health"])
# def test_health_endpoints(endpoint):
#     """Try common health endpoints and skip if not found."""
#     url = f"{API_URL}{endpoint}"
#     resp = requests.get(url, headers=get_auth_headers())
#     if resp.status_code == 404:
#         pytest.skip(f"{endpoint} not implemented on API")
#     assert resp.status_code == 200


# def test_books_list():
#     url = f"{API_URL}/books?page=0&size=5"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200
#     data = resp.json()
#     assert "content" in data
#     assert isinstance(data["content"], list)


# @pytest.mark.parametrize("book_id", [1, 2, 3])
# def test_book_detail(book_id):
#     url = f"{API_URL}/books/{book_id}"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code in [200, 404]
#     if resp.status_code == 200:
#         data = resp.json()
#         assert "id" in data
#         assert data["id"] == book_id


# def test_search_books():
#     url = f"{API_URL}/books?search=tolstoy"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200
#     data = resp.json()
#     assert "content" in data
#     assert isinstance(data["content"], list)


# def test_unauthorized_access():
#     """Verify API returns 401 with wrong credentials."""
#     bad_headers = get_auth_headers("wrongUser", "wrongPass")
#     url = f"{API_URL}/books"
#     resp = requests.get(url, headers=bad_headers)
#     assert resp.status_code == 401










# import os
# import base64
# import pytest
# import requests

# API_URL = os.getenv("API_URL", "http://assignment-be.jaksmok.com/api/v1")
# USERNAME = os.getenv("API_USERNAME", "sampleId")
# PASSWORD = os.getenv("API_PASSWORD", "Secret")


# def get_auth_headers():
#     token = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
#     return {"Authorization": f"Basic {token}", "Content-Type": "application/json"}


# @pytest.mark.parametrize("endpoint", ["/actuator/health", "/ping", "/health"])
# def test_health_endpoints(endpoint):
#     """Try common health endpoints and skip if not found."""
#     url = f"{API_URL}{endpoint}"
#     resp = requests.get(url, headers=get_auth_headers())
#     if resp.status_code == 404:
#         pytest.skip(f"{endpoint} not implemented on API")
#     assert resp.status_code == 200


# def test_books_list():
#     url = f"{API_URL}/books?page=0&size=5"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200
#     data = resp.json()
#     assert "content" in data
#     assert isinstance(data["content"], list)


# @pytest.mark.parametrize("book_id", [1, 2, 3])
# def test_book_detail(book_id):
#     url = f"{API_URL}/books/{book_id}"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code in [200, 404]
#     if resp.status_code == 200:
#         data = resp.json()
#         assert "id" in data
#         assert data["id"] == book_id


# def test_search_books():
#     url = f"{API_URL}/books?search=tolstoy"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200
#     data = resp.json()
#     assert "content" in data
#     assert isinstance(data["content"], list)











# import os
# import base64
# import pytest
# import requests

# # Load API config from environment, fallback to defaults
# API_URL = os.getenv("API_URL", "http://assignment-be.jaksmok.com/api/v1")
# USERNAME = os.getenv("API_USERNAME", "sampleId")
# PASSWORD = os.getenv("API_PASSWORD", "Secret")


# def get_auth_headers():
#     """Return HTTP headers with Basic Auth."""
#     token = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
#     return {
#         "Authorization": f"Basic {token}",
#         "Content-Type": "application/json"
#     }


# def test_books_list():
#     """Test fetching paginated list of books."""
#     url = f"{API_URL}/books?page=0&size=5"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200, f"Unexpected status {resp.status_code}"
#     data = resp.json()
#     assert "content" in data, "Response missing 'content'"
#     assert isinstance(data["content"], list)


# @pytest.mark.parametrize("book_id", [1, 2, 3])
# def test_book_detail(book_id):
#     """Test fetching book by ID (should exist or return 404)."""
#     url = f"{API_URL}/books/{book_id}"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code in [200, 404], f"Unexpected {resp.status_code}"
#     if resp.status_code == 200:
#         data = resp.json()
#         assert "id" in data
#         assert data["id"] == book_id


# def test_search_books():
#     """Test search filter works on books endpoint."""
#     url = f"{API_URL}/books?search=tolstoy"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200
#     data = resp.json()
#     assert "content" in data
#     assert isinstance(data["content"], list)












# import os
# import base64
# import pytest
# import requests

# API_URL = os.getenv("API_URL", "http://assignment-be.jaksmok.com/api/v1")
# USERNAME = os.getenv("API_USERNAME", "sampleId")
# PASSWORD = os.getenv("API_PASSWORD", "Secret")

# def get_auth_headers():
#     token = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
#     return {"Authorization": f"Basic {token}"}


# def test_items_list():
#     """Test fetching paginated list of items"""
#     url = f"{API_URL}/items?page=0&size=5"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200, f"Unexpected status {resp.status_code}"
#     data = resp.json()
#     assert "content" in data, "Response missing 'content'"
#     assert isinstance(data["content"], list)


# @pytest.mark.parametrize("item_id", [1, 2, 3])  # test a few IDs
# def test_item_detail(item_id):
#     """Test fetching single item by ID"""
#     url = f"{API_URL}/items/{item_id}"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code in [200, 404]  # either exists or not
#     if resp.status_code == 200:
#         data = resp.json()
#         assert "id" in data
#         assert data["id"] == item_id


# def test_search_items():
#     """Test search filter works"""
#     url = f"{API_URL}/items?search=test"
#     resp = requests.get(url, headers=get_auth_headers())
#     assert resp.status_code == 200
#     data = resp.json()
#     assert "content" in data
#     assert isinstance(data["content"], list)
