const book1 = new Book("Narnia Chronicles I", "C.S Lewis", crypto.randomUUID(), true, 198);
const book2 = new Book("Narnia Chronicles II", "C.S Lewis", crypto.randomUUID(), true, 200);
const book3 = new Book("Narnia Chronicles III", "C.S Lewis", crypto.randomUUID(), true, 153);

const myLibrary = [book1, book2, book3];

function Book (title, author, id, read, pages) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.read = read;
    this.pages = pages;
}

function addBook() {

    const title = prompt("Title: "); 
    const author = prompt("Author: "); 
    const id = crypto.randomUUID();
    const read = true;
    const pages = +(prompt("Number of pages: "));

    const newBook = new Book(title, author, id, read, pages);

    myLibrary.push(newBook);

    console.log(myLibrary);
}

const addBookButton = document.querySelector(".add");

addBookButton.addEventListener("click", addBook)

const mainSection = document.querySelector("main");

function displayBook () {
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.setAttribute("data-id", book.id);

        const bookTitle = document.createElement("p");
        bookTitle.innerText = book.title;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = book.author;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement("p");
        bookPages.innerText = book.pages;
        bookCard.appendChild(bookPages);

        const bookState = document.createElement("p");
        const bookSpanState = document.createElement("span");
        if(book.read) {
            bookSpanState.innerText = "Readed";
        } else {
            bookSpanState.innerText = "Unreaded";
        }
        bookState.appendChild(bookSpanState);
        bookCard.appendChild(bookState);

        mainSection.appendChild(bookCard);
    });
}

displayBook();

console.log(myLibrary[1]);