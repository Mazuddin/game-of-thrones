import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const CharacterIcon = ({ gender }) => {

  const iconClasses = {
    Male: faMars,
    Female: faVenus,
    Unknown: faQuestionCircle,
  };

  
  const icon = iconClasses[gender] || iconClasses.Unknown;

  return <FontAwesomeIcon icon={icon} size="xl" pulse />;
};

export default CharacterIcon;
