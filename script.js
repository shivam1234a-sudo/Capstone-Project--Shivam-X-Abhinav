let currentBooks = [];
const container = document.getElementById("container");

window.onload = function(){
getBooks("bestsellers");
loadMyBooks();
};

function searchBooks(){
const query = document.getElementById("searchInput").value;
getBooks(query);
}

function getBooks(query){

container.innerHTML = "Loading...";

fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
.then(res=>res.json())
.then(data=>{

if(!data.items){
container.innerHTML="No Books Found";
return;
}

currentBooks = data.items;
displayBooks(currentBooks);
loadMyBooks();

});

}

function displayBooks(books){

container.innerHTML="";

books.forEach(item=>{

const info = item.volumeInfo;

const card = document.createElement("div");
card.className="card";

card.innerHTML = `
<img src="${info.imageLinks?.thumbnail || ''}">
<h3>${info.title || 'No Title'}</h3>
<p>${info.authors ? info.authors.join(", ") : 'Unknown'}</p>

<button onclick="openDetails(
'${info.title || ''}',
'${info.authors ? info.authors.join(", ") : 'Unknown'}',
'${info.imageLinks?.thumbnail || ''}',
'${info.publisher || 'Not Available'}',
'${info.pageCount || 'Unknown'}'
)">Details</button>
`;

container.appendChild(card);

});

}

function loadMyBooks(){

fetch("http://127.0.0.1:5000/products")
.then(res=>res.json())
.then(data=>{

data.forEach(book=>{

const card = document.createElement("div");
card.className="card";

card.innerHTML = `
<img src="${book.image}">
<h3>${book.title}</h3>
<p>${book.author}</p>

<button onclick="openDetails(
'${book.title}',
'${book.author}',
'${book.image}',
'Custom Book',
'${book.price}'
)">Details</button>
`;

container.appendChild(card);

});

});

}

function openDetails(title,author,image,publisher,pages){

localStorage.setItem("title",title);
localStorage.setItem("author",author);
localStorage.setItem("image",image);
localStorage.setItem("publisher",publisher);
localStorage.setItem("pages",pages);

window.location.href="detail.html";
}

function sortAZ(){

const sorted = [...currentBooks].sort((a,b)=>
a.volumeInfo.title.localeCompare(b.volumeInfo.title)
);

displayBooks(sorted);
loadMyBooks();

}

function sortZA(){

const sorted = [...currentBooks].sort((a,b)=>
b.volumeInfo.title.localeCompare(a.volumeInfo.title)
);

displayBooks(sorted);
loadMyBooks();

}