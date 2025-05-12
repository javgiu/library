// Dialog element 
const dialogElement = document.querySelector("dialog");
// Make the dialog easy to close  //
// dialogElement.closedBy = "any";

// Close dialog button
const closeDialogButton = document.querySelector(".close-dialog");

// Add dialog button 
const addDialogButton = document.querySelector(".add");

// Main div
const mainSection = document.querySelector("main");

// New book button in the header
const newBookButton = document.querySelector(".new-book");

// Book constructor
function Book (title, author, id, status, pages) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.id = id;
    this.status = status;
    this.pages = pages;
};

// My predetermined books
const book1 = new Book("Narnia Chronicles I", "C.S Lewis", crypto.randomUUID(), true, 198);
const book2 = new Book("Narnia Chronicles II", "C.S Lewis", crypto.randomUUID(), false, 200);
const book3 = new Book("Narnia Chronicles III", "C.S Lewis", crypto.randomUUID(), true, 153);

// Array to store My Books
const myLibrary = [book1, book2, book3];

// Function to change status
Book.prototype.changeStatus = function() {
    if (this.status)
        this.status = false;
    else 
        this.status = true;
};

// Display book call for predetermined books
myLibrary.forEach(displayBook);

// Shows dialog with the form
newBookButton.addEventListener("click", () => {
    dialogElement.showModal();
});

// Delete book listener
mainSection.addEventListener("click", deleteBook);

// Close dialog button listener
closeDialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialogElement.close();
});

// Add dialog button listener
addDialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    addBook();
    dialogElement.close();
});

// Change book status in the display listener
mainSection.addEventListener("click", changeBookStatus);

// Change book status in the display function
function changeBookStatus(e) {
        if (e.target.className === "change-status-button") {

        const div = e.target.parentNode.parentNode;
        const bookToChangeIndex = myLibrary.findIndex(book => book.id === div.dataset.id);

        myLibrary[bookToChangeIndex].changeStatus();

        if(myLibrary[bookToChangeIndex].status === true ) {
            div.querySelector(".book-status").innerText = "Readed";
            e.target.innerText = "Unreaded";
        } else {
            div.querySelector(".book-status").innerText = "Unreaded";
            e.target.innerText = "Readed";
        }
    }
};

// Display book function
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

    const bookStatus = document.createElement("p");
    bookStatus.className = "book-status";
    const bookSpanStatus = document.createElement("span");
    if(book.status) {
        bookSpanStatus.innerText = "Readed";
    } else {
        bookSpanStatus.innerText = "Unreaded";
    }
    bookStatus.appendChild(bookSpanStatus);
    bookCard.appendChild(bookStatus);

    const bookButtonsDiv = document.createElement("div");
    const bookButtonDelete = document.createElement("button"); 
    const bookStatusButton = document.createElement("button");

    bookButtonsDiv.className = "buttons"

    bookButtonDelete.innerText = "Delete";
    bookButtonDelete.className = "delete";

    bookStatusButton.innerText = 
        book.status === true ? "Unreaded" : "Readed";
    bookStatusButton.className = "change-status-button";
    
    bookButtonsDiv.appendChild(bookButtonDelete);
    bookButtonsDiv.appendChild(bookStatusButton);
    

    bookCard.appendChild(bookButtonsDiv);


    mainSection.appendChild(bookCard);
};

// Add book function
function addBook() {

    const title = document.querySelector("#title").value; 
    const author = document.querySelector("#author").value; 
    const id = crypto.randomUUID();
    const status = 
        document.querySelector("#status").value == "yes" ? true : false;
    const pages = document.querySelector("#pages").value;

    const newBook = new Book(title, author, id, status, pages);

    displayBook(newBook);

    myLibrary.push(newBook);

    console.log(myLibrary);

    console.dir(dialogElement);
}

// Delete book function
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