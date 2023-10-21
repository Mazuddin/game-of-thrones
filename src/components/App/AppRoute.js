import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import Home from './components/Home';
import CharacterDetail from './components/CharacterDetail';
import Houses from './components/Houses/Houses';
import Books from './components/Books/Books';
import SearchResultsPage from './components/Search/SearchResultsPage'; 
import About from './components/About/About'; 

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/characters' element={<CharacterList />} />
        <Route path='/characters/:id' element={<CharacterDetail />} />
        <Route path='/houses' element={<Houses />} />
        <Route path='/books' element={<Books />} />
        <Route path='/about' element={<About />} />
        <Route path='/search-results/:query' element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}
export default AppRoute;
