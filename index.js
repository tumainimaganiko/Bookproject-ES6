import Store from './modules/store.js';
import Book from './modules/book.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      bookElement.innerHTML = `
              <div>
              <span><strong>Title:</strong> ${book.title}</span>
              <span><strong>Author:</strong> ${book.author}</span>
              </div>
              <button class="delete">Remove</button>
            `;
      bookList.appendChild(bookElement);
    });
  }

  static addBook() {
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    const book = new Book(title, author);
    Store.addBook(book);
    UI.displayBooks();
    titleInput.value = '';
    authorInput.value = '';
  }

  static removeBook(target) {
    if (target.classList.contains('delete')) {
      const bookElement = target.parentElement;
      const title = bookElement.querySelector('span:first-child').textContent.split(': ')[1];
      const author = bookElement.querySelector('span:nth-child(2)').textContent.split(': ')[1];
      const book = new Book(title, author);
      Store.removeBook(book);
      UI.displayBooks();
    }
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', UI.displayBooks);

const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  UI.addBook();
});

const bookList = document.getElementById('book-list');
bookList.addEventListener('click', (e) => {
  UI.removeBook(e.target);
});

setInterval(() => {
  const date = DateTime.now();
  document.querySelector('#date').innerHTML = date.toLocaleString(
    DateTime.DATETIME_MED,
  );
}, 1000);

const list = document.getElementById('list');
list.addEventListener('click', (e) => {
  e.preventDefault();
  const booklist = document.querySelector('#book-list');
  const addBookForm = document.querySelector('#addBookForm');
  const contact = document.querySelector('.contact');
  const heading = document.querySelector('#heading1');
  booklist.style.display = 'block';
  addBookForm.style.display = 'none';
  heading.style.display = 'block';
  contact.style.display = 'none';
});

const add = document.getElementById('add');
add.addEventListener('click', (e) => {
  e.preventDefault();
  const addBookForm = document.querySelector('#addBookForm');
  const heading = document.querySelector('#heading1');
  const contact = document.querySelector('.contact');
  addBookForm.style.display = 'flex';
  const booklist = document.querySelector('#book-list');
  booklist.style.display = 'none';
  contact.style.display = 'none';
  heading.style.display = 'none';
});

const contact = document.getElementById('contact');
contact.addEventListener('click', (e) => {
  e.preventDefault();
  const addBookForm = document.querySelector('#addBookForm');
  const heading = document.querySelector('#heading1');
  const contact = document.querySelector('.contact');
  addBookForm.style.display = 'none';
  const booklist = document.querySelector('#book-list');
  contact.style.display = 'flex';
  booklist.style.display = 'none';
  heading.style.display = 'none';
});