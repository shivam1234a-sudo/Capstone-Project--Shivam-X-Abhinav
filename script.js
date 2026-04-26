let currentBooks = [];
const container = document.getElementById("container");

window.onload = function () {
  getBooks("bestsellers");
};

function searchBooks() {
  const query = document.getElementById("searchInput").value;
  getBooks(query);
}


function getBooks(query) {
  container.innerHTML = "<p>Loading...</p>";

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        container.innerHTML = "<p>No books found</p>";
        return;
      }

      currentBooks = data.items;
      displayBooks(currentBooks);
    })
    .catch(err => console.log(err));
}


function displayBooks(books) {
  container.innerHTML = "";

  books.forEach(item => {
        const info = item.volumeInfo;

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = info.imageLinks?.thumbnail || "https://via.placeholder.com/100";

        const title = document.createElement("h3");
        title.innerText = info.title || "No Title";

        const author = document.createElement("p");
        author.innerText = info.authors ? info.authors.join(", ") : "Unknown Author";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(author);

        container.appendChild(card);
      });
    }

function sortAZ() {
  const sorted = [...currentBooks].sort((a, b) =>
    a.volumeInfo.title.localeCompare(b.volumeInfo.title)
  );
  displayBooks(sorted);
}

function sortZA() {
  const sorted = [...currentBooks].sort((a, b) =>
    b.volumeInfo.title.localeCompare(a.volumeInfo.title)
  );
  displayBooks(sorted);
}
