let currentBooks = [];
const container = document.getElementById("container");

window.onload = function () {
  getBooks("bestsellers");   // Google API books
  loadMyBooks();            // Flask backend books
};

// Search books from Google API
function searchBooks() {
  const query = document.getElementById("searchInput").value;
  getBooks(query);
}

// Get books from Google API
function getBooks(query) {
  container.innerHTML = "<h2>Loading...</h2>";

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(res => res.json())
    .then(data => {

      if (!data.items) {
        container.innerHTML = "<h2>No books found</h2>";
        return;
      }

      currentBooks = data.items;
      displayGoogleBooks(currentBooks);
      loadMyBooks();
    })
    .catch(err => console.log(err));
}

// Display Google books
function displayGoogleBooks(books) {

  container.innerHTML = "";

  books.forEach(item => {

    const info = item.volumeInfo;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}">
      <h3>${info.title || 'No Title'}</h3>
      <p>${info.authors ? info.authors.join(", ") : 'Unknown Author'}</p>
      <button onclick="showDetails(
        '${info.title || ""}',
        '${info.authors ? info.authors.join(", ") : ""}',
        '${info.publisher || "Not Available"}',
        '${info.pageCount || "Unknown"}'
      )">Details</button>
    `;

    container.appendChild(card);
  });
}

// Load books from Flask backend
function loadMyBooks() {

  fetch("http://127.0.0.1:5000/products")
    .then(res => res.json())
    .then(data => {

      data.forEach(book => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${book.image}">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <button onclick="showDetails(
            '${book.title}',
            '${book.author}',
            'Custom Added Book',
            '${book.price}'
          )">Details</button>
        `;

        container.appendChild(card);
      });

    })
    .catch(err => console.log(err));
}

// Show details
function showDetails(title, author, publisher, pages) {
  alert(
    "Title: " + title +
    "\nAuthor: " + author +
    "\nPublisher: " + publisher +
    "\nPrice / Pages: " + pages
  );
}

// Sort A-Z
function sortAZ() {

  const sorted = [...currentBooks].sort((a, b) =>
    a.volumeInfo.title.localeCompare(b.volumeInfo.title)
  );

  displayGoogleBooks(sorted);
  loadMyBooks();
}

// Sort Z-A
function sortZA() {

  const sorted = [...currentBooks].sort((a, b) =>
    b.volumeInfo.title.localeCompare(a.volumeInfo.title)
  );

  displayGoogleBooks(sorted);
  loadMyBooks();
}
// OPEN DETAILS PAGE

function openDetails(title, author, image, publisher, pages) {

localStorage.setItem("title", title);
localStorage.setItem("author", author);
localStorage.setItem("image", image);
localStorage.setItem("publisher", publisher);
localStorage.setItem("pages", pages);

window.location.href = "details.html";

}