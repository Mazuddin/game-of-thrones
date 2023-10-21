import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import './Houses.css';

function Houses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    region: '',
    hasWords: false,
    hasTitles: false,
    hasSeats: false,
    hasDiedOut: false,
    hasAncestralWeapons: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const apiUrl = 'https://anapioficeandfire.com/api/houses';

    const queryString = Object.entries(filters)
      .filter(([key, value]) => {
        return value !== '' && (typeof value !== 'boolean' || value === true);
      })
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const offset = (currentPage - 1) * pageSize;

    axios
      .get(`${apiUrl}?${queryString}&page=${currentPage}&pageSize=${pageSize}`)
      .then((response) => {
        setHouses(response.data);
        setTotalPages(Math.ceil(response.headers['x-total'] / pageSize));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching houses:', error);
        setError(error);
        setLoading(false);
      });
  }, [filters, currentPage, pageSize]);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFilters({
      ...filters,
      [name]: newValue,
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <div className="houses-container">
      <h2 className="houses-title">Game of Thrones Houses</h2>
      <div className="filters">
        <div className="filter-item">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            id="region"
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="hasWords">Has Words:</label>
          <input
            type="checkbox"
            id="hasWords"
            name="hasWords"
            checked={filters.hasWords}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="hasTitles">Has Titles:</label>
          <input
            type="checkbox"
            id="hasTitles"
            name="hasTitles"
            checked={filters.hasTitles}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="hasSeats">Has Seats:</label>
          <input
            type="checkbox"
            id="hasSeats"
            name="hasSeats"
            checked={filters.hasSeats}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="hasDiedOut">Has Died Out:</label>
          <input
            type="checkbox"
            id="hasDiedOut"
            name="hasDiedOut"
            checked={filters.hasDiedOut}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="hasAncestralWeapons">Has Ancestral Weapons:</label>
          <input
            type="checkbox"
            id="hasAncestralWeapons"
            name="hasAncestralWeapons"
            checked={filters.hasAncestralWeapons}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="houses-error">Error: {error.message}</p>
      ) : (
        <div>
          <ul className="houses-list">
            {houses.map((house) => (
              <li key={house.url} className="house-item">
                <h3 className="house-name">{house.name}</h3>
                <p className="house-region">Region: {house.region}</p>
                <p className="house-words">Words: {house.words}</p>
                <p>Titles: {house.titles.join(', ')}</p>
                <p>Seats: {house.seats.join(', ')}</p>
                <p>Died Out: {house.diedOut ? 'Yes' : 'No'}</p>
                <p>Ancestral Weapons: {house.ancestralWeapons.join(', ')}</p>
                <p>
                  Current Lord:{' '}
                  {house.currentLord ? (
                    <Link to={`/characters/${house.currentLord.split('/').pop()}`}>
                      {house.currentLord.split('/').pop()}
                    </Link>
                  ) : (
                    'N/A'
                  )}
                </p>
                <p>
                  Sworn Members:{' '}
                  {house.swornMembers.length > 0 ? (
                    house.swornMembers.map((swornMember, index) => (
                      <Link
                        key={index}
                        to={`/characters/${swornMember.split('/').pop()}`}
                      >
                        {swornMember.split('/').pop()}
                        {index < house.swornMembers.length - 1 ? ', ' : ''}
                      </Link>
                    ))
                  ) : (
                    'N/A'
                  )}
                </p>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </div>
  );
}

export default Houses;
