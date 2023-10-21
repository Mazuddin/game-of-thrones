import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Books.module.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);

  useEffect(() => {
    const apiUrl = 'https://www.anapioficeandfire.com/api/books';

    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(apiUrl);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsMoreInfoVisible(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Game of Thrones Books</h1>
      <div className={styles['book-list-container']}>
        <div className={styles['book-list']}>
          {loading && <p>Loading...</p>}
          {error && <p className={styles['text-danger']}>Error: {error.message}</p>}
          {books.length > 0 ? (
            <ul className={styles['list-group']}>
              {books.map((book, index) => (
                <li
                  key={book.url}
                  className={styles['list-group-item']}
                  onClick={() => handleCardClick(book)}
                >
                  <div className={styles['book-title']}>
                    <span role="img" aria-label="book icon">📖</span>
                    <h3>{book.name}</h3>
                  </div>
                  <button>Details</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Searching...</p>
          )}
        </div>
      </div>
      {selectedBook && isMoreInfoVisible && (
        <div className={styles['book-details']}>
          <h3>Selected Book Details</h3>
          <p>{selectedBook.name}</p>
          <p>Released: {selectedBook.released}</p>
          <p>Number of pages: {selectedBook.numberOfPages}</p>
          <p>Publisher: {selectedBook.publisher}</p>
          <p>Country: {selectedBook.country}</p>
          <button onClick={() => setIsMoreInfoVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Books;
