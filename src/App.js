import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// Pages
import MovieSearchPage from "./pages/MovieSearchPage";
import ResultsPage from "./pages/ResultsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const renderHeader = () => (
  <header className="header">
    <h5>Movie Search!</h5>
  </header>
);

const App = () => {
  return (
    <div className="App">
      {renderHeader()}
      <Routes>
        <Route path="/" element={<MovieSearchPage />} />
        <Route path="/movies" element={<ResultsPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<div>Sorry, not a route!</div>} />
      </Routes>
    </div>
  );
};

export default App;
