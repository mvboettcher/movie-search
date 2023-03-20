import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
// Pages
import MovieSearchPage from "./pages/MovieSearchPage";
import ResultsPage from "./pages/ResultsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const App = () => {
  const navigate = useNavigate();

  const renderHeader = () => (
    <div
      className="p-3 d-flex justify-content-start"
      onClick={() => navigate("/")}
    >
      <h5 className="home-btn">Movie Search!</h5>
    </div>
  );

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
