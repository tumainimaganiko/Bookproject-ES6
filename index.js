import Store from './modules/store.js';
import Book from './modules/book.js';

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