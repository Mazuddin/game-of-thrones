import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';
import SearchBar from '../Search/SearchBar';

function NavigationBar() {
  const routes = [
    { to: '/', text: '🏠 Home' },
    { to: '/characters', text: '👥 Characters' },
    { to: '/houses', text: '🏰 Houses' },
    { to: '/books', text: '📚 Books' },
    { to: '/about', text: '🏦 About' }
  ];

  return (
    <nav>
      <div className="nav-left">
        {routes.map((route, index) => (
          <NavLink key={index} to={route.to} className="active-link">
            {route.text}
          </NavLink>
        ))}
      </div>
      <div className="nav-right">
        <SearchBar />
      </div>
    </nav>
  );
}

export default NavigationBar;
