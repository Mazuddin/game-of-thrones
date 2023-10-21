import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const { query } = useParams();
  const apiUrl = 'https://anapioficeandfire.com/api';
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const [booksResponse, charactersResponse, housesResponse] = await Promise.all([
          axios.get(`${apiUrl}/books?name=${query}`),
          axios.get(`${apiUrl}/characters?name=${query}`),
          axios.get(`${apiUrl}/houses?name=${query}`),
        ]);

        const books = booksResponse.data.map((book) => ({
          type: 'Book',
          data: {
            name: book.name,
            isbn: book.isbn,
            authors: book.authors,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            country: book.country,
            mediaType: book.mediaType,
            released: book.released,
          },
        }));

        const characters = charactersResponse.data.map((character) => ({
          type: 'Character',
          data: {
            name: character.name,
            id: character.url.split('/').pop(),
            firstName: character.firstName,
            lastName: character.lastName,
            title: character.titles.join(', '),
            family: character.allegiances[0],
          },
        }));

        const houses = housesResponse.data.map((house) => ({
          type: 'House',
          data: {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles.join(', '),
            seats: house.seats.join(', '),
            diedOut: house.diedOut === '' ? 'No' : 'Yes',
            ancestralWeapons: house.ancestralWeapons.join(', '),
          },
        }));

        const combinedResults = [...books, ...characters, ...houses];
        setSearchResults(combinedResults);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSearchResults([]);
        setLoading(false);
      }
    };

    handleSearch();
  }, [query]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Search Results for "{query}"</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <h3>{result.data.name}</h3>
                {result.type === 'Book' && (
                  <>
                    <p>ISBN: {result.data.isbn}</p>
                    <p>Authors: {result.data.authors.join(', ')}</p>
                    <p>Pages: {result.data.numberOfPages}</p>
                    <p>Publisher: {result.data.publisher}</p>
                    <p>Country: {result.data.country}</p>
                    <p>Media Type: {result.data.mediaType}</p>
                    <p>Released: {result.data.released}</p>
                  </>
                )}
                {result.type === 'Character' && (
                  <>
                    <p>ID: {result.data.id}</p>
                    <p>First Name: {result.data.firstName}</p>
                    <p>Last Name: {result.data.lastName}</p>
                    <p>Title: {result.data.title}</p>
                    <p>Family: {result.data.family}</p>
                  </>
                )}
                {result.type === 'House' && (
                  <>
                    <p>Region: {result.data.region}</p>
                    <p>Words: {result.data.words}</p>
                    <p>Titles: {result.data.titles}</p>
                    <p>Seats: {result.data.seats}</p>
                    <p>Died Out: {result.data.diedOut}</p>
                    <p>Ancestral Weapons: {result.data.ancestralWeapons}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
