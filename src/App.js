import React from "react";
import MovieSearchForm from "./components/MovieSearchForm";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <h5>Movie Search!</h5>
      </header>
      <MovieSearchForm />
    </div>
  );
};

export default App;
