const BASE_URL = "https://books-backend.p.goit.global/books/top-books";
const ulBooks = document.querySelector(".books-list");
const body = document.querySelector("body");
const container = document.querySelector(".books-container");

async function getAllBooks() {
  try {
    const response = await fetch(BASE_URL);
    const booksData = await response.json();
    // console.log(booksData);
    // console.log(booksData[1]);
    // console.log(booksData[1].books);
    const markup = booksData[1].books
      .map(({ _id, book_image, author }) => {
        return `
  <li class='chosen-book' data-id=${_id}>
  <img src="${book_image}">
  <p>${author}
  </li>
  `;
      })
      .join("");
    ulBooks.insertAdjacentHTML("beforeend", markup);

    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}

// console.log(Promise.resolve())

getAllBooks()
  .then(() => {
    const bookElements = document.querySelectorAll(".chosen-book");
    // ulBooks.addEventListener("click", openModal);

    bookElements.forEach((el) => el.addEventListener("click", (event) => openModal(event, el)));

    function openModal(event, el) {
      const bookId = el.dataset.id;
      

      const backdrop = document.querySelector(".backdrop");
      backdrop.classList.remove("is-hidden");

      const closeBtn = document.querySelector(".close-btn ");
      closeBtn.addEventListener("click", closeModal);

      function closeModal() {
        backdrop.classList.add("is-hidden");
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });

// try {
// const response = await fetch('https://books-backend.p.goit.global/books/${idBook}');

// function createBooksMarkup() {
//  const markup = booksData[1].books
//      .map(({ book_image, author }) => {
//        return `
//   <li> <img src="${book_image}">
//   <p>${author}
//   </li>
//   `;
//      })
//      .join("");
//    ulBooks.insertAdjacentHTML("beforeend", markup);
// }
