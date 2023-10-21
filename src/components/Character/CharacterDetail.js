import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faQuestion } from '@fortawesome/free-solid-svg-icons';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();

  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const [relatedNames, setRelatedNames] = useState({});

  useEffect(() => {
    axios
      .get(`https://anapioficeandfire.com/api/characters/${id}`)
      .then((response) => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching character details:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchRelatedCharacterNames = async () => {
      const promises = character.allegiances?.map(async (url) => {
        try {
          const response = await axios.get(url);
          return response.data.name;
        } catch (error) {
          console.error('Error fetching related character details:', error);
          return 'N/A';
        }
      });

      const names = await Promise.all(promises);

      const allegianceNames = {};
      character.allegiances?.forEach((url, index) => {
        allegianceNames[url] = names[index];
      });

      setRelatedNames(allegianceNames);
    };

    if (character.allegiances?.length > 0) {
      fetchRelatedCharacterNames();
    }
  }, [character.allegiances]);

  const genderIcon =
    character.gender === 'Male'
      ? faMars
      : character.gender === 'Female'
        ? faVenus
        : faQuestion;

  return (
    <div className="character-detail-container">
      <h2 className="character-detail-title">
        {character.name || character.aliases?.[0] || 'N/A'}
      </h2>
      <div className="character-info-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="character-info">
            <div className="character-details">
              <table className="character-details-table">
                <tbody>
                  <tr>
                    <td>Gender:</td>
                    <td>
                      <FontAwesomeIcon icon={genderIcon} />
                    </td>
                  </tr>
                  <tr>
                    <td>Born:</td>
                    <td>{character.born || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Died:</td>
                    <td>{character.died || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Titles:</td>
                    <td>{character.titles?.join(', ') || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Father:</td>
                    <td>{relatedNames[character.father] || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Mother:</td>
                    <td>{relatedNames[character.mother] || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Spouse:</td>
                    <td>{relatedNames[character.spouse] || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Allegiances:</td>
                    <td>
                      {character.allegiances?.map((url) => (
                        <div key={url}>
                          <Link to={`/characters/${url.split('/').pop()}`}>
                            {relatedNames[url] || 'N/A'}
                          </Link>
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterDetail;
