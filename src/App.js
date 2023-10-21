import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CharacterList from './components/Character/CharacterList';
import CharacterDetail from './components/Character/CharacterDetail';
import Books from './components/Books/Books';
import Houses from './components/House/Houses';
import NavigationBar from './components/NavigationBar/NavigationBar';
import SearchResultsPage from './components/Search/SearchResultsPage';
import About from './components/About/About';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <NavigationBar />
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/books" element={<Books />} />
            <Route path="/about" element={<About />} />
            <Route path="/search-results/:query" element={<SearchResultsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
