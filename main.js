const book1 = new Book("Narnia Chronicles I", "C.S Lewis", crypto.randomUUID(), true, 198);
const book2 = new Book("Narnia Chronicles II", "C.S Lewis", crypto.randomUUID(), true, 200);
const book3 = new Book("Narnia Chronicles III", "C.S Lewis", crypto.randomUUID(), true, 153);

// Dialog element 
const dialogElement = document.querySelector("dialog");

// Make the dialog easy to close  //
// dialogElement.closedBy = "any";

// Close dialog button
const closeDialogButton = document.querySelector(".close-dialog");

// Add dialog button 
const addDialogButton = document.querySelector(".add");

const myLibrary = [book1, book2, book3];

function Book (title, author, id, read, pages) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.read = read;
    this.pages = pages;
}

const newBookButton = document.querySelector(".new-book");

newBookButton.addEventListener("click", () => {
    dialogElement.showModal();
});

const mainSection = document.querySelector("main");

myLibrary.forEach(displayBook);

function displayBook (book) {
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

    const bookButtonsDiv = document.createElement("div");
    const bookButtonDelete = document.createElement("button"); 
    const bookButtonRead = document.createElement("button");

    bookButtonsDiv.className = "buttons"

    bookButtonDelete.innerText = "Delete";
    bookButtonDelete.className = "delete";

    bookButtonRead.innerText = bookSpanState.innerText;
    bookButtonRead.className = "readed";
    
    bookButtonsDiv.appendChild(bookButtonDelete);
    bookButtonsDiv.appendChild(bookButtonRead);
    

    bookCard.appendChild(bookButtonsDiv);


    mainSection.appendChild(bookCard);
};

closeDialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialogElement.close();
});

addDialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    addBook();
    dialogElement.close();
});

function addBook() {

    const title = document.querySelector("#title").value; 
    const author = document.querySelector("#author").value; 
    const id = crypto.randomUUID();
    const read = 
        document.querySelector("#status").value == "yes" ? true : false;
    const pages = document.querySelector("#pages").value;

    const newBook = new Book(title, author, id, read, pages);

    displayBook(newBook);

    myLibrary.push(newBook);

    console.log(myLibrary);

    console.dir(dialogElement);
}

mainSection.addEventListener("click", deleteBook);

function deleteBook(e) {
    if (e.target.className === "delete") {

        const divToDelete = e.target.parentNode.parentNode;
        console.dir(divToDelete);
        const bookToRemoveIndex = myLibrary.findIndex(book => book.id === divToDelete.dataset.id);

        console.log(bookToRemoveIndex);

        myLibrary.splice(bookToRemoveIndex, 1);

        mainSection.removeChild(divToDelete);
    }

}