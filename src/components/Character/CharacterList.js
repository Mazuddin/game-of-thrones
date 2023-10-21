import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://anapioficeandfire.com/api/characters`, {
          params: {
            page: currentPage,
            pageSize: pageSize,
          },
        });
        setCharacters(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, pageSize]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getGenderString = (gender) => {
    if (gender === 'Male') {
      return 'Male';
    }
    else if (gender === 'Female') {
      return 'Female';
    }
    else {
      return 'Unknown';
    }
  };

  return (
    <div className="character-list">
      <h1>Character List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name or Aliases</th>
                <th>Culture</th>
                <th>Gender</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character) => (
                <tr key={character.url}>
                  <td>{character.url.split('/').pop()}</td>
                  <td>{character.name || (character.aliases?.length > 0 ? character.aliases[0] : 'N/A')}</td>
                  <td>{character.culture || 'N/A'}</td>
                  <td>{getGenderString(character.gender)}</td>
                  <td>
                    <Link to={`/characters/${character.url.split('/').pop()}`}>Click For More Info</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span>Page {currentPage}</span>
            <button onClick={nextPage}>Next Page</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterList;
